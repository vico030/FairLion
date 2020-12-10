const express = require("express");
const router = express.Router();
const service = require("../services/favouritesService");
const { isAuthenticated } = require("../services/authService");


router.get("/", isAuthenticated, async (req, res) => {
    try {
        const response = await service.getFavouriteFromUser(req.userId);
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

router.put("/", isAuthenticated, async (req, res) => {
    try {
        const response = await service.addFavouriteArticle(req.userId, req.body.articleId);
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

router.delete("/", isAuthenticated, async (req, res) => {
    try {
        const response = await service.removeFavouriteArticle(req.userId, req.body.articleId);
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