const express = require("express");
const {
    ErrorHandler
} = require("../helpers/error");
const router = express.Router();
const articleService = require('../services/articleService');
const {isAuthenticated} = require("../services/authService");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './files')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + file.originalname)
    }
})

var fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/bmp') {
        callback(null, true);
    } else {
        callback(new Error('Only jpeg, bmp or png formats are supported.'), false);
    }
}

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//get all articles
router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await articleService.getAllArticles(req.userId);
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

//update all articles
router.put("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await articleService.updateAllArticles(req.body);
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

//delete all articles
router.delete("/", isAuthenticated, async (req, res, next) => {
    try {
        const response = await articleService.deleteAllArticles();
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

//get a single article by id
router.get("/:articleId", isAuthenticated, async (req, res, next) => {
    try {
        const response = await articleService.getArticleById(req.userId, req.params.articleId);
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

//update a single article
router.put("/:articleId", isAuthenticated, upload.array("images"), async (req, res, next) => {
    try {
        if (req.files) {
            req.body.images = [];
            for(var file of req.files)
            {
                req.body.images.push(file.path);
            }
        }
        const response = await articleService.updateArticleById(req.body, req.params.articleId);
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

//delete a single article
router.delete("/:articleId", isAuthenticated, async (req, res, next) => {
    try {
        const response = await articleService.deleteArticleById(req.params.articleId);
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

//get articles from friends by articlename
router.get("/query/:articlename", isAuthenticated, async (req, res, next) => {
    try {
        const response = await articleService.getArticlesFromFriendsByName(req.userId, req.params.articlename);
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