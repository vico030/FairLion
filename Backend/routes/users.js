const express = require("express");
const router = express.Router();
const service = require("../services/userService");

router.post("/:userId/articles", (req, res) => {
    service.newArticle(req, res);
});

router.post("/:userId/friendrequests", (req, res) => {
    service.friendrequest(req, res);
})

router.post("/:userId/articlerequests", (req, res) => {
    service.articlerequest(req, res);
})

module.exports = router;