const express = require("express");
const {
    ErrorHandler
} = require("../helpers/error");
const router = express.Router();
const articleService = require('../services/articleService');

router.get("/", (req, res, next) => {
    articleService.getAllArticles((err, articles) => {
        if (err) {
            console.log("ERROR!!!!!"); // ERROR_HANDLER!!!!
        } else {
            res.status(200).send(articles);
        }
    });
});

router.put("/", (req, res, next) => {
    articleService.updateAllArticles(req.body, (err, articles) => {
        if (err) {
            console.log("ERROR!!!!!"); // ERROR_HANDLER!!!!
        } else {
            res.status(200).send(articles);
        }
    });
});

router.delete("/", (req, res, next) => {
    articleService.deleteAllArticles((err, articles) => {
        if (err) {
            console.log(err); // ERROR_HANDLER!!!!
        } else {
            res.status(200).send(articles);
        }
    })
});

module.exports = router;