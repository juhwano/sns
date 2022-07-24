const setResponse = require('../../modules/response');
const code = require('../../modules/status-code');
const imageModel = require('../../models/image');
const postModel = require('../../models/post');
const contentModel = require('../../models/content');
const hashtagModel = require('../../models/hashtag');
const db = require('../../models/index');

const postService = {
  createPost: async (data) => {
    const { title, content, hashtags } = data.body;
    //유저 id
    const { id } = data.userInfo.dataValues;
    //구분자 제거
    const hashtagList = hashtags.split(',');
    //해시태그 공백, 해시 제거
    const deleteHashList = hashtagList.map((hashtag) => {
      return hashtag.trim().slice(1);
    });
    try {
      //해시태그 등록
      const hashResult = deleteHashList.map((hashtagItem) => {
        return hashtagModel.findOrCreate({
          where: { name: hashtagItem },
        });
      });
      //게시글 등록
      const newPost = await postModel.create({
        title,
        user_id: id,
      });
      const post_id = newPost.dataValues.id;
      //게시글 내용 등록
      const newContents = await contentModel.create({
        content,
        post_id,
      });
      return setResponse(code.CREATED, '게시글 등록 성공');
    } catch (error) {
      console.error(error);
    }
    //태그 검색

    //[트랜잭션 사용]
    //1. 글에 등록하고자 하는 태그가 없다면 tag 테이블에 추가
    //2. post에 글을 추가/수정 -> insert한 후 글 pk
    //3. post_id를 통해 post_tag 테이블에 해시태그들을 추가
    //4. 커밋
    // console.log(title, content, hashtags, id);
    //post테이블에 user_id, img_url, content 넣기
    //for 문 돌면서 hashtag 테이블에 등록된 해시태그인지 확인
    //select hashtag_id from hashtag where keyw

    //등록되지 않은 해시태그인 경우, hashtag 테이블과 post_hashtag테이블 모두 insert
    //if result === 0

    //등록된 해시태그인 경우, post_hashtag 테이블에만 INSERT
  },
  uploadImage: async (data) => {
    const { post_id } = data.params;
    const img = data.file;
    const name = img.originalname;
    const path = img.location;
    const size = img.size;

    if (img) {
      try {
        const newImage = await imageModel.create({
          name,
          path,
          size,
          post_id,
        });
        console.log('newImage: ', newImage);

        return setResponse(code.OK, '이미지 업로드 완료', {
          newImage,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      return setResponse(code.BAD_REQUEST, '이미지 업로드 실패');
    }
  },
};

module.exports = postService;
