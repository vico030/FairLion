const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const ArticleRequestSchema = mongoose.Schema({
    articleId: {
        type: ObjectId,
        required: true
    },
    owner: {
        type: ObjectId,
        required: true
    },
    borrower: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('ArticleRequest', ArticleRequestSchema);