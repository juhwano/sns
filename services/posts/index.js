const setResponse = require('../../modules/response');
const code = require('../../modules/status-code');
const imageModel = require('../../models/image');
const postModel = require('../../models/post');
const contentModel = require('../../models/content');
const hashtagModel = require('../../models/hashtag');

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
  updatePost: async (data) => {
    const { post_id } = data.params;
    const { title, content } = data.body;
    console.log(title, content);
    console.log('post_id: ', post_id);
    //
    try {
      if (title === undefined) {
        const newContent = contentModel.update(
          {
            content,
          },
          { where: { post_id } },
        );
      } else if (content === undefined) {
        const newTitle = postModel.update(
          {
            title,
          },
          { where: { id: post_id } },
        );
      } else {
        const newTitle = postModel.update(
          {
            title,
          },
          { where: { id: post_id } },
        );

        const newContent = contentModel.update(
          {
            content,
          },
          { where: { post_id } },
        );
      }

      return setResponse(code.OK, '게시글 수정 성공');
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = postService;
