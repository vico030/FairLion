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
        type: String
    },
    borrower: {
        type: String
    }
})

module.exports = mongoose.model("Article", articleSchema);