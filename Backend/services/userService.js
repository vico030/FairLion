const fs = require('fs');
const userModel = require("../models/UserModel");
const articleModel = require("../models/ArticleModel");
const friendRequestModel = require("../models/FriendRequestModel");
const articleRequestModel = require("../models/ArticleRequestModel");

function getAllUsers() {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await userModel.find({})
                .select('-password')
                .catch(err => {
                    throw err
                });
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
    return new Promise(async (resolve, reject) => {
        try {
            const users = await userModel.find({
                    'username': {
                        $regex:  `^${username}`,
                        $options: 'i'
                    }
                })
                .select('-password')
                .catch(err => {
                    throw err
                });
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
                .catch(err => {
                    throw err
                });
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
            const articles = await articleModel.find({
                    [possesionType]: userId
                })
                .catch(err => {
                    throw err
                });
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
    return new Promise(async (resolve, reject) => {
        try {
            const users = await userModel.find({})
                .catch(err => {
                    throw err
                });
            userModel.deleteMany({})
                .catch(err => {
                    throw err
                });
            // Delete images in storage
            for(var user of users)
            {
                fs.unlink(user.image,(err)=>{
                    // in case of error, skip and continue
                });
            }
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
                .catch(err => {
                    throw err
                });
            userModel.findByIdAndDelete(userId)
                .catch(err => {
                    throw err
                });
            // Delete image in storage
            fs.unlink(user.image,(err)=>{
                // in case of error, skip and continue
            });
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
    return new Promise(async (resolve, reject) => {
        try {
            const article = new articleModel({
                ...body,
                status: "Vorhanden",
                owner: userId
            })
            const newArticle = await article.save()
            return resolve({
                data: newArticle,
                message: 'Artikel wurde erstellt.',
                status: 201
            });
        } catch (err) {
            //Delete images from storage if upload is faulty
            if(body.images){
                for(var image of body.images){
                    fs.unlink(image,(err)=>{
                        // in case of error, skip and continue
                    });
                }
            }
            return reject({
                error: err,
                status: 500,
                message: 'Artikel konnte nicht erstellt werden.'
            });
        }
    });
}

function getFriendRequests(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const newFriendRequests = [];
            const friendrequests = await friendRequestModel.find({
                "receiverId": userId
            })
            for (let friendrequest of friendrequests) {
                try {
                    const requester = await userModel.findById(friendrequest.requesterId)
                        .select("username image")
                    newFriendRequests.push({
                        ...friendrequest._doc,
                        requesterName: requester.username,
                        requesterImage: requester.image
                    });
                } catch (err) {
                    throw err;
                }
            }
            return resolve({
                data: newFriendRequests,
                message: 'Freundesanfragen wurden gefunden.',
                status: 200
            })
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Freundesanfragen konnten nicht gefunden werden.'
            });
        }
    });
}

function createFriendRequest(body, userId) {
    return new Promise((resolve, reject) => {
        const request = new friendRequestModel({
            requesterId: userId,
            receiverId: body.receiverId,
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

function deleteFriendRequest(requestId) {
    return new Promise(async (resolve, reject) => {
        try {
            const friendrequest = await friendRequestModel.findById(requestId)
                .catch(err => {
                    throw err
                });
            friendRequestModel.findByIdAndDelete(requestId)
                .catch(err => {
                    throw err
                });
            return resolve({
                data: friendrequest,
                message: 'Freundesanfrage wurde gelöscht.',
                status: 201
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Freundesanfrage konnte nicht gelöscht werden.'
            });
        }
    });
}

function confirmFriendRequest(requestId) {
    return new Promise(async (resolve, reject) => {
        try {
            const friendrequest = await friendRequestModel.findByIdAndUpdate(requestId, {
                    "confirmed": true
                }, {
                    new: true
                })
                .catch(err => {
                    throw err
                });
            userModel.findByIdAndUpdate(friendrequest.receiverId, {
                    "$push": {
                        friends: friendrequest.requesterId
                    }
                }, {
                    new: true
                })
                .catch(err => {
                    throw err
                });
            userModel.findByIdAndUpdate(friendrequest.requesterId, {
                    "$push": {
                        friends: friendrequest.receiverId
                    }
                }, {
                    new: true
                })
                .catch(err => {
                    throw err
                });
            friendRequestModel.findByIdAndDelete(requestId)
                .catch(err => {
                    throw err
                });
            return resolve({
                data: friendrequest,
                message: 'Freundesanfrage wurde bestätigt.',
                status: 201
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Freundesanfrage konnte nicht bestätigt werden.'
            });
        }
    });
}

function updateUser(body, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findByIdAndUpdate(userId, body, {
                    new: true
                })
                .catch(err => {
                    throw err
                });
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

// Move to ArticleService?
function deleteAllUserArticles(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const articles = await articleModel.find({
                    "owner": userId
                })
                .catch(err => {
                    throw err
                });
            articleModel.deleteMany({
                    "owner": userId
                })
                .catch(err => {
                    throw err
                });
            // Delete images in storage
            for (var article of articles)
            {
                if(article.images){
                    for(var image of article.images){
                        fs.unlink(image,(err)=>{
                            // in case of error, skip and continue
                        });
                    }
                }
            }
            
            return resolve({
                data: articles,
                message: 'Artikel wurden erfolgreich entfernt.',
                status: 200
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Artikel konnten nicht entfernt werden.'
            })
        }
    });
}

function getFriends(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userModel.findById(userId)
                .catch(err => {
                    throw err
                });
            const friendIds = user.friends;
            const friends = await userModel.find({
                    "_id": {
                        $in: friendIds
                    }
                })
                .select('-password')
                .catch(err => {
                    throw err
                });
            return resolve({
                data: friends,
                message: 'Freunde wurden gefunden.',
                status: 201
            });
        } catch (err) {
            return reject({
                error: err,
                status: 500,
                message: 'Freunde konnten nicht gefunden werden. :('
            });
        }
    });
}


module.exports = {
    getAllUsers,
    getUsersByName,
    getUserById,
    getArticles,
    getFriends,
    getFriendRequests,
    deleteAllUsers,
    deleteUser,
    deleteFriendRequest,
    createArticle,
    deleteAllUserArticles,
    createFriendRequest,
    confirmFriendRequest,
    updateUser
};