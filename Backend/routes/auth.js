const express = require("express");
const router = express.Router();
const service = require("../services/authService");

router.post("/register", async (req, res) => {
    try {
        const { data, status, message, refreshToken, authToken } = await service.registerUser(req.body);
        res.cookie("authToken", authToken, { httpOnly: true, maxAge: 9999999999/*, secure: true*/ });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 9999999999/*, secure: true*/ });
        res.status(status).json({ data, message })
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { data, status, message, authToken, refreshToken } = await service.loginUser(req.body);
        res.cookie("authToken", authToken, { httpOnly: true, maxAge: 9999999999, secure: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 9999999999, secure: true });
        res.status(status).json({ data, message })
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
})

router.get("/logout", async (req, res) => {
    try {

    }
    catch (err) {

    }
})

module.exports = router;