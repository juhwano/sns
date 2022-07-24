const express = require('express');
const router = express.Router();
const postController = require('../../controllers/posts');
const authModule = require('../../modules/auth');
const upload = require('../../modules/multer-s3');

router.get('/', postController.test);
//게시글 등록authModule = requir,
router.post('/', authModule.loggedIn, postController.createPost);
//게시글 이미지 등록(upload는 미들웨어인데 next가 없는데요?? - multer 자체가 미들웨어)
// router.get('/:post_id')

router.post(
  '/:post_id/image',
  authModule.loggedIn,
  upload.single('image'), //하나의 파일을 받아ㅓㅅ 저장
  postController.uploadImage,
);
//Filtering (= 필터링)
//해시태그 검색(태그 눌러서 이동)

//해시태그 검색(검색어 입력)

module.exports = router;
