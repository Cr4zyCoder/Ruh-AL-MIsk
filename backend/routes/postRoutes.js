const express = require('express');
const router = express.Router();
const { getPosts, getPostById, createPost } = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getPosts)
    .post(protect, admin, createPost);

router.route('/:id').get(getPostById);

module.exports = router;
