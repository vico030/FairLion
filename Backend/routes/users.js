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
        });
    }
});

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

// Get all articles owned by a single user
router.get("/:userId/ownedArticles", async (req, res) =>{
    try {
        const response = await service.getArticles(req.params.userId, "owner");
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
router.post("/:userId/ownedArticles", async (req, res) => {
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

// Delete all articles owned by one user
router.delete("/:userId/ownedArticles", async (req, res) => {
    try {
        const response = await service.deleteAllUserArticles(req.params.userId);
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

// Get all articles borrowed by a single user
router.get("/:userId/borrowedArticles", async (req, res) =>{
    try {
        const response = await service.getArticles(req.params.userId, "borrower");
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

// Get all friendrequests for the user as receiver
router.get("/:userId/friendrequests", async (req, res) => {
    try {
        const response = await service.getFriendRequests(req.params.userId);
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

// Create a new friendrequest for the user as requester
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

// Delete a friendrequest for the user as receiver
router.delete("/:userId/friendrequests/:requestId", async (req, res) => {
    try {
        const response = await service.deleteFriendRequest(req.params.requestId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        });
    }
});

// Confirm friendrequest and add each user as a friend
router.put("/:userId/friendrequests/:requestId", async (req, res) =>{
    try {
        const response = await service.confirmFriendRequest(req.params.requestId);
        res.status(response.status).json({
            'data': response.data,
            'message': response.message
        });
    }
    catch ({ error, status, message }) {
        res.status(status).json({
            'error': error,
            'message': message
        });
    }
});

// Create a new article request for the user as requester
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

// Get all friends of one user
router.get("/:userId/friends", async (req, res) => {
    try {
        const response = await service.getFriends(req.params.userId);
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

module.exports = router;