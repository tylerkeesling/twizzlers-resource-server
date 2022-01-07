const express = require('express');
const auth = require('../../middleware/auth');
const postsController = require('../../controllers/posts.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('posts:read'), postsController.list)
  .post(auth('posts:write'), postsController.create);

module.exports = router;
