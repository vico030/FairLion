const User = require("../models/UserModel");
const Article = require("../models/ArticleModel");
const userService = require("./userService");

const getFavouriteFromUser = function (userId) {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userId, { $pull: { favourites: null } }, { new: true })
            .then(async (user) => {
                const articles = [];
                for (let i = 0; i < user.favourites.length; i++) {
                    const article = await Article.findById(user.favourites[i]);
                    articles[i] = article;
                }
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

const addFavouriteArticle = function (userId, articleId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByIdAndUpdate(userId, { $push: { favourites: articleId } }, { new: true })
                .catch(err => { throw err });
            return resolve({
                data: user,
                message: 'Favourite wurde hinzugefügt.',
                status: 201
            });
        } catch (err) {
            console.log(err)
            return reject({
                error: err,
                status: 500,
                message: 'User-Update konnte nicht durchgeführt werden.'
            });
        }
    });
}

const removeFavouriteArticle = function (userId, articleId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByIdAndUpdate(userId, { $pull: { favourites: articleId } }, { new: true })
                .catch(err => { throw err });
            return resolve({
                data: user,
                message: 'Favourite wurde entfernt.',
                status: 201
            });
        } catch (err) {
            console.log(err)
            return reject({
                error: err,
                status: 500,
                message: 'User-Update konnte nicht durchgeführt werden.'
            });
        }
    });
}

module.exports = {
    getFavouriteFromUser,
    addFavouriteArticle,
    removeFavouriteArticle
}