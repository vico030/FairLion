const express = require("express");
const router = express.Router();
const service = require("../services/userService");

router.post("/:userId/articles", async (req, res) => {
    try {
        const response = await service.createArticle(req.body, req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch({error, status, message}){
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

router.post("/:userId/friendrequests", async (req, res) => {
    try {
        const response = await service.createFriendRequest(req.body);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch({error, status, message}){
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
})

router.post("/:userId/articlerequests", async (req, res) => {
    try {
        const response = await service.createArticleRequest(req.body);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch({error, status, message}){
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
})

module.exports = router;