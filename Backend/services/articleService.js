const Article = require('../models/ArticleModel');

const getAllArticles = function (callback) {
    Article.find({})
        .then(articles => {
            return callback(null, articles);
        })
        .catch(err => {
            return callback(err);
        });
}

const updateAllArticles = function (body, callback) {
    let params = {};
    for (let prop in body)
        if (body[prop]) params[prop] = body[prop];
    Article.find({})
        .then(articles => {
            articles.forEach(article => {
                article.overwrite({
                    ...article.toObject(),
                    ...params
                });
                article.save();
            });
            return callback(null, articles);
        })
        .catch(err => {
            return callback(err);
        });
}

const deleteAllArticles = function (callback) {
    articles = {}
    Article.find({}).then(findings =>{ articles = findings});
    Article.deleteMany({})
        .then(() => {
            return callback(null, articles);
        })
        .catch(err => {
            return callback(err)
        });
}


module.exports = {
    getAllArticles,
    updateAllArticles,
    deleteAllArticles
};