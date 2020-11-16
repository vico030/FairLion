const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const friendRequest = mongoose.model("FriendRequest",
    {
        requesterId : { type: ObjectId, required: true },
        recieverId : { type: ObjectId, required: true },
        date : Date,
        comfirmed : { type: Boolean, default: false }
    });

module.exports = friendRequest;