const express = require("express");
const router = express.Router();
const service = require("../services/articleRequestService");
const { isAuthenticated } = require("../services/authService");


//Get all article-requests from the current user
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await service.getArticleRequests(req.userId, "owner");
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

//Create an article-request for a specific articleId
router.post("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await service.createArticleRequests(req.body, req.userId);
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

//update an article-request, where you are the article owner / accepting or declining request?
router.put("/:requestId", isAuthenticated, async (req, res, next) => {
    try {
        const response = await service.updateArticleRequest(req.body, req.params.requestId, req.userId);
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

router.delete("/:requestId", isAuthenticated, async (req, res, next) => {
    try {
        const response = await service.deleteArticleRequest(req.params.requestId, req.userId);
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


//Get your currently pending reuqests to other users
router.get("/pending", isAuthenticated, async (req, res, next) => {
    try {
        const response = await service.getArticleRequests(req.userId, "borrower");
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

module.exports = router;