const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user');
const authModule = require('../../modules/auth');

router.get('/', userController.test);

//[토큰 필요 X]
//회원 가입
router.post('/register', userController.register);

//[토큰 필요]
//로그인
router.post('/login', authModule.loggedIn, userController.login);

module.exports = router;
