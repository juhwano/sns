const express = require('express');
const router = express.Router();
const postController = require('../../controllers/posts');
const authModule = require('../../modules/auth');
const upload = require('../../modules/multer-s3');

router.get('/', postController.test);
//게시글 등록
router.post('/', authModule.loggedIn, postController.createPost);
//게시글 이미지 등록(upload는 미들웨어인데 next가 없는데요?? - multer 자체가 미들웨어)
router.post(
  '/:post_id/image',
  authModule.loggedIn,
  upload.single('image'),
  postController.uploadImage,
);
//게시글 수정
router.patch('/:post_id', authModule.loggedIn, postController.updatePost);
//게시글 삭제
router.delete('/:post_id', authModule.loggedIn, postController.deletePost);
//게시글 복구
router.patch(
  '/:post_id/recover',
  authModule.loggedIn,
  postController.recoverPost,
);
//Filtering (= 필터링)
//해시태그 검색(태그 눌러서 이동)

//해시태그 검색(검색어 입력)

module.exports = router;
