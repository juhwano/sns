const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');

router.get('/', userController.test);
//[토큰 필요]
//로그인
router.post('/login', userController.login);

//[토큰 필요 X]
//회원 가입
router.post('/register', userController.register);

module.exports = router;
