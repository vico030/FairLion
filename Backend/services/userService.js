const articleModel = require("../models/ArticleModel");
const friendRequestModel = require("../models/FriendRequestModel");
const articleRequestModel = require("../models/ArticleRequestModel");

function createArticle(body, userId) {
    return new Promise((resolve, reject) => {
        const article = new articleModel({
            ...body,
            status: "Vorhanden",
            owner: userId
        });
        article.save()
            .then((article) => {
                return resolve({
                    data: article,
                    message: 'Eintrag wurde erstellt.',
                    status: 201
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Eintrag konnte nicht erstellt werden.'
                })
            });
    });
}

function createFriendRequest(req, res) {
    const request = new friendRequestModel({
        requesterId: req.params.userId,
        recieverId: req.body.recieverId,
        date: Date.now(),
        confirmed: false
    })

    request.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}

function createArticleRequest(req, res) {
    const request = new articleRequestModel({
        articleId: req.body.articleId,
        requesterId: req.params.userId,
        comfirmed: false,
        date: Date.now()
    })

    request.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}


module.exports = {
    createArticle,
    createFriendRequest,
    createArticleRequest
};