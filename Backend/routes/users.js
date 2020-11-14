const express = require("express");
const router = express.Router();
const service = require("../services/userService");
const { isAuthenticated } = require("../services/authService");

router.get("/", async (req, res) => {
    try{
        const response = await service.getAllUsers();
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

router.post("/:userId/articles", isAuthenticated, async (req, res) => {
    try {
        const response = await service.createArticle(req.body, req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

router.post("/:userId/friendrequests", async (req, res) => {
    try {
        const response = await service.createFriendRequest(req.body, req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
})

router.post("/:userId/articlerequests", async (req, res) => {
    try {
        const response = await service.createArticleRequest(req.body, req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
})

module.exports = router;