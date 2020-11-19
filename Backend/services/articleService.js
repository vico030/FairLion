const Article = require('../models/ArticleModel');
const User = require("../models/UserModel");

const getAllArticles = function () {
    return new Promise((resolve, reject) => {
        Article.find({})
            .then((articles) => {
                return resolve({
                    data: articles,
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

const getArticlesFromFriendsByName = function (userId, title) {
    return new Promise(async (resolve, reject) => {
        try {
            const articles = {};
            const user = await User.findById(userId);
            for (let i = 0; i < user.friends.length; i++) {
                const { username } = await User.findById(user.friends[i]);
                const articlesFromFriend = await Article.find({ "owner": user.friends[i], 'username': { $regex: title, $options: 'i' } });
                articles[username] = articlesFromFriend;
            }
            return resolve({
                data: articles,
                message: 'Einträge wurden gefunden.',
                status: 200
            })
        }
        catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Fehler beim finden vom User.'
            })
        }
    });
}

const getArticleById = function (articleId) {
    return new Promise((resolve, reject) => {
        Article.findById(articleId)
            .then((articles) => {
                return resolve({
                    data: articles,
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

const updateAllArticles = function (body) {
    return new Promise((resolve, reject) => {
        let params = {};
        for (let prop in body)
            if (body[prop]) params[prop] = body[prop];
        Article.find({})
            .then((articles) => {
                articles.forEach(article => {
                    article.overwrite({
                        ...article.toObject(),
                        ...params
                    });
                    article.save();
                });
                return resolve({
                    data: articles,
                    message: 'Eintrag wurde bearbeitet.',
                    status: 201
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Eintrag konnte nicht bearbeitet werden.'
                })
            });
    });
}

function updateArticleById(body, articleId) {
    return new Promise(async (resolve, reject) => {
        try {
            const article = await Article.findByIdAndUpdate(articleId, body, { new: true })
                .catch(err => { throw err });
            return resolve({
                data: article,
                message: 'Article-Update wurde durchgeführt.',
                status: 201
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Article-Update konnte nicht durchgeführt werden.'
            });
        }
    });
}

const deleteAllArticles = function () {
    return new Promise((resolve, reject) => {
        articles = {}
        Article.find({}).then(findings => { articles = findings })
        Article.deleteMany({})
            .then(() => {
                return resolve({
                    data: articles,
                    message: 'Einträge wurden gelöscht.',
                    status: 200
                })
            })
            .catch((err) => {
                return reject({
                    error: err,
                    status: 500,
                    message: 'Einträge konnte nicht gelöscht werden.'
                })
            });
    });
}

const deleteArticleById = function (articleId) {
    return new Promise((resolve, reject) => {
        Article.findById(articleId)
            .then((articles) => {
                copy = articles;
                articles.delete();
                return resolve({
                    data: copy,
                    message: 'Artikel wurde entfernt.',
                    status: 200
                })
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
    getAllArticles,
    updateAllArticles,
    deleteAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById,
    getArticlesFromFriendsByName
};