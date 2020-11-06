const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const user = mongoose.model("User",
    {
        username: { type: String, unique: true, required: true, dropDups: true },
        password: { type: String, required: true },
        email: { type: String, unique: true, required: true, dropDups: true },
        phone: String,
        street: String,
        zipCode: String,
        city: String,
        country: String,
        info: String,
        image: String,
        friends: [ObjectId],
        favourites: [ObjectId]
    });

module.exports = user;