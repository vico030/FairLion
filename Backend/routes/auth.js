const express = require("express");
const router = express.Router();
const service = require("../services/authService");

router.post("/register", async (req, res) => {
    try {
        const { data, status, message } = await service.registerUser(req.body);
        res.status(status).json({ data, message })
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
});

router.post("/login", (req, res) => {
    try {
        const { data, status, message } = await service.registerUser(req.body);
        res.status(status).json({ data, message })
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
})

module.exports = router;