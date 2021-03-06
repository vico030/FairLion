const express = require("express");
const router = express.Router();
const service = require("../services/authService");
const multer = require('multer');
const path = require("path");

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

router.post("/register", upload.single('image'), async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
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
        return res.sendFile(path.resolve(__dirname + "/../HTML/emailVerification.html"));
    }
    catch ({ err, message, status }) { //destruct reject object, one catch because both tries handled the same
        console.log(err, message, status);
        return res.status(status).send(message) //nachricht bei server error
    }
})


router.get("/logout", async (req, res) => {
    res.clearCookie("authToken");
    res.clearCookie("refreshToken");
    res.status(200).send("Success")
})

router.post("/pwreset", async (req, res) => {
    try {
        const { data, message, status } = await service.resetPassword(req.body.email);
        res.status(status).json({ data, message });
    }
    catch ({ error, status, message }) {
        res.status(status).json({ error, message })
    }
})

// change user password
router.post("/pwchange", async (req, res) => {
    try {
        const response = await service.changePassword(req.body);
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