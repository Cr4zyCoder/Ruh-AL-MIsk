const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Fragrance Discovery', 'Heritage', 'Oud Guide', 'News'],
        default: 'Fragrance Discovery'
    },
    status: {
        type: String,
        required: true,
        enum: ['Draft', 'Published'],
        default: 'Published'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
