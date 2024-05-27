const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');

// Protected routes



// Routes for posts
router.get('/', postController.getAllPosts);       // Get all posts
router.get('/:id', postController.getPostById);    // Get a single post by ID
router.post('/', verifyToken, postController.createPost);       // Create a new post
router.put('/:id', verifyToken, postController.updatePost);    // Update an existing post
router.delete('/:id', verifyToken, postController.deletePost);  // Delete a post

module.exports = router;
