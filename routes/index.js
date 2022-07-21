const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const postRouter = require('./post');

//유저
router.use('/users', userRouter);
//게시글
router.use('/posts', postRouter);

module.exports = router;
