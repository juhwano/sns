const userService = require('../../services/user');

const userController = {
  test: (req, res) => {
    res.json('user');
  },
  register: async (req, res) => {
    try {
      const result = await userService.register(req.body);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  },
  login: async (req, res) => {
    try {
      const result = await userService.login(req);

      return res.send(result);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userController;
