const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const articleSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    duration: {
        required: true,
        type: String
    },
    images: {
        required: true,
        type: [String]
    },
    status: {
        required: true,
        type: String
    },
    owner: {
        required: true,
        type: ObjectId
    },
    borrower: {
        required: true,
        type: ObjectId
    }
})

module.exports = mongoose.model("Article", ArticleSchema);