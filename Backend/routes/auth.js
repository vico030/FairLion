const express = require("express");
const router = express.Router();
const service = require("../services/authService");

router.post("/register", (req, res) => {
    service.register(req, res);
});

module.exports = router;