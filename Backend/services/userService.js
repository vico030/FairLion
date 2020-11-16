const userModel = require("../models/UserModel");
const articleModel = require("../models/ArticleModel");
const friendRequestModel = require("../models/FriendRequestModel");
const articleRequestModel = require("../models/ArticleRequestModel");

function getAllUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await userModel.find({})
                .select('-password')
                .catch(err =>{throw err});
            return resolve({
                data: users,
                message: 'User wurden gefunden.',
                status: 200
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

function getUsersByName(username) {
    return new Promise(async (resolve, reject) =>{
        try {
            const users = await userModel.find({'username':  { $regex: username, $options: 'i' }})
                .select('-password')
                .catch(err =>{throw err});
            return resolve({
                data: users,
                message: 'User wurden gefunden.',
                status: 200
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

function getUserById(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findById(userId)
                .select('-password')
                .catch(err =>{throw err});
            return resolve({
                data: user,
                message: 'User wurde gefunden.',
                status: 200
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'User konnte nicht gefunden werden.'
            });
        }
    });
}

// Move to ArticleService?
function getArticles(userId, possesionType) {
    return new Promise(async (resolve, reject) => {
        try {
            const articles = await articleModel.find({[possesionType]: userId})
                .catch(err =>{throw err});
            return resolve({
                data: articles,
                message: 'Artikel wurden gefunden.',
                status: 200
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Artikel konnten nicht gefunden werden.'
            });
        }
    });
}

function deleteAllUsers() {
    return new Promise(async (resolve, reject) =>{
        try {
            const users = await userModel.find({})
                .catch(err => {throw err});
            userModel.deleteMany({})
                .catch(err => {throw err});
            return resolve({
                data: users,
                message: 'User wurden erfolgreich entfernt.',
                status: 200
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'User konnten nicht entfernt werden.'
            })
        }
    })
}

function deleteUser(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findById(userId)
                .select('-password')
                .catch(err => {throw err});
            userModel.findByIdAndDelete(userId)
                .catch(err => {throw err});
            return resolve({
                data: user,
                message: 'User wurde erfolgreich entfernt.',
                status: 200
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'User konnte nicht entfernt werden.'
            });
        }
    });
}

// Move to ArticleService?
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

function updateUser(body, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(body);
            const user = await userModel.findByIdAndUpdate(userId, body, {new: true})
                .catch(err => {throw err});
            return resolve({
                data: user,
                message: 'User-Update wurde durchgeführt.',
                status: 201
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'User-Update konnte nicht durchgeführt werden.'
            });
        }
    });
}


module.exports = {
    getAllUsers,
    getUsersByName,
    getUserById,
    getArticles,
    deleteAllUsers,
    deleteUser,
    createArticle,
    createFriendRequest,
    createArticleRequest,
    updateUser
};