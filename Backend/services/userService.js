const articleModel = require("../models/ArticleModel");
const friendRequestModel = require("../models/FriendRequestModel");
const articleRequestModel = require("../models/ArticleRequestModel");

function createArticle(req, res) {
    const article = new articleModel({
        title : req.body.title,
        description : req.body.description,
        duration : req.body.duration,
        images: req.body.images,
        status: "Vorhanden",
        owner: req.params.userId,
    });
    article.save().then(() => {
        console.log("Eintrag wurde erstellt.");
    });
}

function createFriendRequest(req, res) {
    const request = new friendRequestModel({
        requesterId : req.params.userId,
        recieverId : req.body.recieverId,
        date : Date.now(),
        confirmed : false
    })

    request.save().then(() => {
        console.log('Einträge wurden erstellt.');
    });
}

function createArticleRequest(req, res) {
    const request = new articleRequestModel({
        articleId : req.body.articleId,
        requesterId : req.params.userId,
        comfirmed : false,
        date : Date.now()
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