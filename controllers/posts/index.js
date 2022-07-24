const postService = require('../../services/posts');

const postController = {
  test: (req, res) => {
    res.json('post');
  },
  createPost: async (req, res) => {
    try {
      const result = await postService.createPost(req);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  },
  uploadImage: async (req, res) => {
    try {
      const result = await postService.uploadImage(req);
      console.log('result: ', result);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
    // 업로드하고 난 후 결과물
  },
};

module.exports = postController;
