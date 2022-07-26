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

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
    // 업로드하고 난 후 결과물
  },
  updatePost: async (req, res) => {
    try {
      const result = await postService.updatePost(req);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  },
  deletePost: async (req, res) => {
    try {
      const result = await postService.deletePost(req);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  },
  recoverPost: async (req, res) => {
    try {
      const result = await postService.recoverPost(req);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = postController;
