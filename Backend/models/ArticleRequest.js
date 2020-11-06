const { ObjectId } = require('mongooose');
const mongoose = require('mongoose');

const ArticleRequestSchema = mongoose.Schema({
    articleId: {
        type: ObjectId,
        required: true
    },
    requesterId: {
        type: ObjectId,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('ArticleRequest', ArticleRequestSchema);