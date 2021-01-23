const ArticleRequest = require("../models/ArticleRequestModel");
const Article = require("../models/ArticleModel");
const ArticleModel = require("../models/ArticleModel");
const ArticleRequestModel = require("../models/ArticleRequestModel");
const UserModel = require("../models/UserModel");

const getArticleRequests = function (userId, type) {
  return new Promise((resolve, reject) => {
    ArticleRequest.find({ [type]: userId })
      .then(async (articleRequests) => {
        const requestsWithAddtionialData = await Promise.all(articleRequests.map(async request => {
          try {
            const { title, images } = await ArticleModel.findById(request.articleId);
            const user = await UserModel.findById(request.borrower)
              .select("-password")
              .select("-refreshToken")
              .select("-verificationHash")
              .select("-friends");
            const newRequest = {
              ...request.toObject(),
              title,
              user,
              images
            }
            return newRequest;
          }
          catch (err) {
            console.log(err);
            return request;
          }
        }));
        return resolve({
          data: requestsWithAddtionialData,
          message: "Einträge wurden gefunden.",
          status: 200,
        });
      })
      .catch((err) => {
        return reject({
          error: err,
          status: 500,
          message: "Einträge konnten nicht gefunden werden.",
        });
      });
  });
};

function createArticleRequests(body, userId) {
  return new Promise(async (resolve, reject) => {
    const article = await Article.findById(body.articleId);
    console.log(article);
    const articleRequest = new ArticleRequest({
      ...body,
      owner: article.owner,
      borrower: userId,
    });
    articleRequest
      .save()
      .then((articleRequest) => {
        return resolve({
          data: articleRequest,
          message: "Artikelanfrage wurde erstellt.",
          status: 201,
        });
      })
      .catch((err) => {
        return reject({
          error: err,
          status: 500,
          message: "Artikelanfrage konnte nicht erstellt werden.",
        });
      });
  });
}

function updateArticleRequest(body, requestId, userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const oldArticleRequest = await ArticleRequest.findById(requestId);
      if (oldArticleRequest.owner == userId) {
        const articleRequest = await ArticleRequest.findByIdAndUpdate(
          requestId,
          body,
          { new: true }
        ).catch((err) => {
          throw err;
        });
        if (
          oldArticleRequest.status !== "confirmed" &&
          body.status === "confirmed"
        ) {
          //if updating status to confirmed
          addReturnDateToArticle(articleRequest.articleId);
          addBorrowerToArticle(
            articleRequest.articleId,
            articleRequest.borrower
          );
        }
        if (
          oldArticleRequest.status === "confirmed" &&
          body.status === "returned"
        ) {
          //oder das lieber zu delete?
          await ArticleModel.findByIdAndUpdate(articleRequest.articleId, {
            borrower: null,
            returnDate: null,
            status: "Vorhanden",
          });
          await ArticleRequestModel.findByIdAndDelete(articleRequest._id);
        }
        return resolve({
          data: articleRequest,
          message: "Article-Request-Update wurde durchgeführt.",
          status: 201,
        });
      }
      if(oldArticleRequest.borrower == userId) {
        const articleRequest = await ArticleRequest.findByIdAndUpdate(
          requestId,
          body,
          { new: true }
        ).catch((err) => {
          throw err;
        });

        if (
          oldArticleRequest.status === "confirmed" &&
          body.status === "returned"
        ) {
          //oder das lieber zu delete?
          await ArticleModel.findByIdAndUpdate(articleRequest.articleId, {
            borrower: null,
            returnDate: null,
            status: "Vorhanden",
          });
          await ArticleRequestModel.findByIdAndDelete(articleRequest._id);
        }
        return resolve({
          data: articleRequest,
          message: "Article-Request-Update wurde durchgeführt.",
          status: 201,
        });
      }
      else {
        return reject({
          error: "Not Authorized",
          status: 401,
          message: "Sie sind nicht der Besitzer dieser ArticleRequest.",
        });
      }
    } catch (err) {
      console.log(err);
      return reject({
        error: err,
        status: 500,
        message: "Article-Request-Update konnte nicht durchgeführt werden.",
      });
    }
  });
}

const deleteArticleRequest = function (requestId, userId) {
  return new Promise((resolve, reject) => {
    ArticleRequest.findById(requestId)
      .then((articleRequest) => {
        if (articleRequest.owner == userId) {
          copy = articleRequest;
          articleRequest.delete();
          return resolve({
            data: copy,
            message: "Artikelanfrage wurde entfernt.",
            status: 200,
          });
        } else {
          return reject({
            error: "Not Authorized",
            status: 401,
            message: "Sie sind nicht der Besitzer dieser ArticleRequest.",
          });
        }
      })
      .catch((err) => {
        return reject({
          error: err,
          status: 500,
          message: "Artikel konnten nicht gefunden werden.",
        });
      });
  });
};

async function addReturnDateToArticle(id) {
  try {
    const { duration } = await ArticleModel.findById(id);
    const durations = initializeDurationsObject();
    const durationArray = duration.split(" "); //split value from unit
    const dateInDurationSpan = new Date(
      Date.now() +
      durations[durationArray[1].replace(/s$/, "")] *
      parseInt(durationArray[0])
    );
    await ArticleModel.findByIdAndUpdate(id, {
      returnDate: dateInDurationSpan,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addBorrowerToArticle(articleId, borrowerId) {
  try {
    await ArticleModel.findByIdAndUpdate(articleId, {
      borrower: borrowerId,
      status: "Verliehen",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function initializeDurationsObject() {
  const durations = {
    millisecond: 1,
  };
  (durations.second = durations.millisecond * 1000),
    (durations.minute = durations.second * 60),
    (durations.hour = durations.minute * 60),
    (durations.day = durations.hour * 24),
    (durations.week = durations.day * 7),
    (durations.month = durations.day * 30),
    (durations.year = durations.day * 365); // doesn't fact in leap years
  return durations;
}

module.exports = {
  getArticleRequests,
  createArticleRequests,
  updateArticleRequest,
  deleteArticleRequest,
};
