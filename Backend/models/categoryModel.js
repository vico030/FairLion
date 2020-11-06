const mongoose = require("mongoose");

const category = mongoose.model("category",
{
    name : {type : String, unique : true, required : true, dropDups: true}
});

module.exports = category;