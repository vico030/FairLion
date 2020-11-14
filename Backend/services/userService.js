const userModel = require("../models/UserModel");
const articleModel = require("../models/ArticleModel");
const friendRequestModel = require("../models/FriendRequestModel");
const articleRequestModel = require("../models/ArticleRequestModel");

function getAllUsers() {
    return new Promise((resolve, reject) => {
        try {
            const users = userModel.find({});
            users.then((users) => {
                return resolve({
                    data: users,
                    message: 'User wurden gefunden.',
                    status: 200
                });
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'User konnten nicht gefunden werden.'
            })
        }
    });
}

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
                    message: 'Artikel wurde erstellt.',
                    status: 201
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Artikel konnte nicht erstellt werden.'
                })
            });
    });
}

function createFriendRequest(body, userId) {
    return new Promise((resolve, reject) => {
        const request = new friendRequestModel({
            requesterId: userId,
            recieverId: body.recieverId,
            date: Date.now(),
            confirmed: false
        })
        request.save()
            .then((friendRequest) => {
                return resolve({
                    data: friendRequest,
                    message: 'Freundesanfrage wurde erstellt.',
                    status: 201
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Freundesanfrage konnte nicht erstellt werden.'
                })
            });
    });
}

function createArticleRequest(body, userId) {
    return new Promise((resolve, reject) => {
        const request = new articleRequestModel({
            articleId: body.articleId,
            requesterId: userId,
            confirmed: false,
            date: Date.now()
        })
        request.save()
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


module.exports = {
    getAllUsers,
    createArticle,
    createFriendRequest,
    createArticleRequest
};