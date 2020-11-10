const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const friendRequest = mongoose.model("FriendRequest",
    {
        requesterId : { type: String, required: true },
        recieverId : { type: String, required: true },
        date : Date,
        comfirmed : { type: Boolean, default: false }
    });

module.exports = friendRequest;