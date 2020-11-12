const Article = require('../models/ArticleModel');

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

const deleteAllArticles = function () {
    return new Promise((resolve, reject) => {
        articles = {}
        Article.find({}).then(findings => { articles = findings })
        Article.deleteMany({})
            .then((articles) => {
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


module.exports = {
    getAllArticles,
    updateAllArticles,
    deleteAllArticles
};