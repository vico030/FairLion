const Article = require('../models/ArticleModel');
const User = require("../models/UserModel");
const fs = require("fs");

const getAllArticles = function (userId) {
    return new Promise((resolve, reject) => {
        Article.find({})
            .then(async (articles) => {
                const user = await User.findById(userId)
                    .select("-password")
                    .select("-refreshToken")
                    .select("-verificationHash")
                    .select("-friends");
                articles.forEach(article => {
                    if (user.favourites.includes(article._id)) {
                        article.favourite = true;
                    } else {
                        article.favourite = false;
                    }
                });

                let newArticles = [];
                for (let article of articles) {
                    newArticles.push({
                        ...article._doc,
                        user
                    });
                }
                return resolve({
                    data: newArticles,
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
                const friend = await User.findById(user.friends[i])
                    .select("-password")
                    .select("-refreshToken")
                    .select("-verificationHash")
                    .select("-friends");
                const articlesFromFriend = await Article.find({
                    "owner": user.friends[i],
                    'title': {
                        $regex: title,
                        $options: 'i'
                    }
                });

                if (articlesFromFriend.length != null) {

                    articlesFromFriend.forEach(article => {
                        if (user.favourites.includes(article._id)) {
                            article.favourite = true;
                        } else {
                            article.favourite = false;
                        }
                    });
                    let newArticlesFromFriend = []
                    for (let article of articlesFromFriend) {
                        //console.log(friend);
                        newArticlesFromFriend.push({
                            ...article._doc,
                            user: friend._doc
                        });
                    }
                    //console.log(newArticlesFromFriend);
                    articles[friend.username] = newArticlesFromFriend;
                }
            }
            //console.log(articles);
            return resolve({
                data: articles,
                message: 'Einträge wurden gefunden.',
                status: 200
            })
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Fehler beim finden vom User.'
            })
        }
    });
}

const getArticleById = function (userId, articleId) {
    return new Promise((resolve, reject) => {
        Article.findById(articleId)
            .then(async (article) => {
                const user = await User.findById(userId)
                    .select("-password")
                    .select("-refreshToken")
                    .select("-verificationHash")
                    .select("-friends");
                if (user.favourites.includes(articleId)) {
                    article.favourite = true;
                } else {
                    article.favourite = false;
                }
                return resolve({
                    data: {
                        ...article._doc,
                        user
                    },
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
            const article = await Article.findByIdAndUpdate(articleId, body, {
                    new: true
                })
                .catch(err => {
                    throw err
                });
            return resolve({
                data: article,
                message: 'Article-Update wurde durchgeführt.',
                status: 201
            });
        } catch (err) {
            //Delete images from storage if upload is faulty
            if (body.images) {
                for (var image of body.images) {
                    fs.unlink(image, (err) => {
                        // in case of error, skip and continue
                    });
                }
            }
            console.log(err);
            return reject({
                error: err,
                status: 500,
                message: 'Article-Update konnte nicht durchgeführt werden.'
            });
        }
    });
}

const deleteAllArticles = function () {
    return new Promise(async (resolve, reject) => {
        await User.updateMany({}, {
            $set: {
                favourites: []
            }
        });
        articles = {}
        Article.find({}).then(findings => {
            articles = findings
        })
        Article.deleteMany({})
            .then(() => {
                // Delete images in storage
                for (var article of articles) {
                    if (article.images) {
                        for (var image of article.images) {
                            fs.unlink(image, (err) => {
                                // in case of error, skip and continue
                            });
                        }
                    }
                }
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
    return new Promise(async (resolve, reject) => {
        try {
            const article = await Article.findById(articleId);
            if (article.status === "Vorhanden") {
                await User.updateMany({}, {
                    $pull: {
                        favourites: articleId
                    }
                }, {
                    new: true
                });
                await Article.findById(articleId)
                    .then(async (article) => {
                        let userId = article.owner;
                        copy = article;
                        article.delete();
                        await User.findByIdAndUpdate(userId, {
                            $inc: {
                                articleCount: -1
                            }
                        })
                        // Delete images in storage
                        if (copy.images) {
                            for (var image of copy.images) {
                                fs.unlink(image, (err) => {
                                    // in case of error, skip and continue
                                });
                            }
                        }
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
            } else {
                return reject({
                    data: article,
                    status: 400,
                    message: "Artikel befindet sich in Ausleihe und kann deshalb noch nicht gelöscht werden."
                });
            }
        } catch {
            return reject({
                error: err,
                status: 500,
                message: 'Artikel konnten nicht gefunden werden.'
            });
        }
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