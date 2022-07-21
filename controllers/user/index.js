const userService = require('../../services/user');

const userController = {
  test: (req, res) => {
    res.json('user');
  },
  register: async (req, res) => {
    try {
      let result = await userService.register(req.body);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  },
  login: (req, res) => {
    res.json('login');
  },
};

module.exports = userController;
