const ArticleRequest = require("../models/ArticleRequestModel");
const Article = require("../models/ArticleModel");

const getArticleRequests = function (userId, type) {
    return new Promise((resolve, reject) => {
        ArticleRequest.find({[type] : userId})
            .then((articleRequests) => {
                return resolve({
                    data: articleRequests,
                    message: 'Einträge wurden gefunden.',
                    status: 200
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Einträge konnten nicht gefunden werden.'
                })
            });
    });
}

function createArticleRequests(body, userId) {
    return new Promise(async (resolve, reject) => {
        const article = await Article.findById(body.articleId);
        const articleRequest = new ArticleRequest({
            ...body,
            owner: article.owner,
            borrower: userId
        });
        articleRequest.save()
            .then((articleRequest) => {
                return resolve({
                    data: articleRequest,
                    message: 'Artikelanfrage wurde erstellt.',
                    status: 201
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Artikelanfrage konnte nicht erstellt werden.'
                })
            });
    });
}

function updateArticleRequest(body, requestId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const articleRequest = await ArticleRequest.findByIdAndUpdate(requestId, body, {new: true})
                .catch(err => {throw err});
            
            if(articleRequest.owner == userId){
                return resolve({
                    data: articleRequest,
                    message: 'Article-Request-Update wurde durchgeführt.',
                    status: 201
                });
            }
            else{
                return reject({
                    error: "Not Authorized",
                    status:  401,
                    message: 'Sie sind nicht der Besitzer dieser ArticleRequest.'
                });
            }
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Article-Request-Update konnte nicht durchgeführt werden.'
            });
        }
    });
}

const deleteArticleRequest = function (requestId, userId) {
    return new Promise((resolve, reject) => {
        ArticleRequest.findById(requestId)
            .then((articleRequest) => {
                if(articleRequest.owner == userId){
                    copy = articleRequest;
                    articleRequest.delete();
                    return resolve({
                        data: copy,
                        message: 'Artikelanfrage wurde entfernt.',
                        status: 200
                    })
                }
                else{
                    return reject({
                        error: "Not Authorized",
                        status: 401,
                        message: 'Sie sind nicht der Besitzer dieser ArticleRequest.'
                    });
                }
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Artikel konnten nicht gefunden werden.'
                })
            });
    });
}

module.exports = {
    getArticleRequests,
    createArticleRequests,
    updateArticleRequest,
    deleteArticleRequest
};