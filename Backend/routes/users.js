const express = require("express");
const router = express.Router();
const service = require("../services/userService");
const { isAuthenticated } = require("../services/authService");

// Get all users
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

// Get all users with a certain username
router.get("/query/:username", async (req, res) => {
    try {
        const response = await service.getUsersByName(req.params.username);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    } catch ({error, status, message}) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

// Get single user by userId
router.get("/:userId", async (req, res) => {
    try {
        const response = await service.getUserById(req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    } catch ({error, status, message}) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

// Delete all users
router.delete("/", async (req, res) => {
    try {
        const response = await service.deleteAllUsers();
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    } catch ({error, status, message}) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

// Delete single user
router.delete("/:userId", async (req, res) =>{
    try {
        const response = await service.deleteUser(req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    } catch ({error, status, message}) {
        res.status(status).json({
            'error': error,
            'message': message
        });
    }
});

// Create a new article for one user
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

// Create a new friend request for the user as requester
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

// create a new article request for the user as requester
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

// update a single user
router.put("/:userId", async (req, res) => {
    try {
        const response = await service.updateUser(req.body, req.params.userId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    } catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        })
    }
});

module.exports = router;