const express = require("express");
const router = express.Router();
const service = require("../services/authService");

router.post("/register", async (req, res) => {
    try {
        const { data, status, message, refreshToken, authToken } = await service.registerUser(req.body);
        res.cookie("authToken", authToken, { httpOnly: true, maxAge: 9999999999 });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 9999999999 });
        res.status(status).json({ data, message })
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { data, status, message, authToken, refreshToken } = await service.loginUser(req.body);
        res.cookie("authToken", authToken, { httpOnly: true, maxAge: 9999999999 });
        res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 9999999999 });
        res.status(status).json({ data, message })
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
})

router.get("/verify/:hash", async (req, res) => { //verify through email, hash sent with the email, link in email contains hash
    try {
        const { data, status, message } = await service.verifyUser(req.params.hash)//check, if user has that hash
        return res.status(status).send(message)
    }
    catch ({ err, message, status }) { //destruct reject object, one catch because both tries handled the same
        console.log(err, message, status);
        return res.status(status).send(message) //nachricht bei server error
    }
})


router.get("/logout", async (req, res) => {
    try {

    }
    catch (err) {

    }
})

module.exports = router;