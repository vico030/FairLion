const express = require("express");
const router = express.Router();
const service = require("../services/favouritesService");
const { isAuthenticated } = require("../services/authService");

//Get favourites from logged in User
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


//add favourite to logged in user
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

//remove favourite from logged in user
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