const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const friendRequest = mongoose.model("friendRequest",
{
    requesterId = {type : ObjectId, required : true},
    recieverId = {type : ObjectId, required : true},
    date = date,
    comfirmed = {type : Boolean, default: false}
});

module.exports = friendRequest;