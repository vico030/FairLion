const mongoose = require("mongoose");

const category = mongoose.model("Category",
    {
        name: { type: String, unique: true, required: true, dropDups: true }
    });

module.exports = category;