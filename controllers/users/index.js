const userService = require('../../services/users');

const userController = {
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
