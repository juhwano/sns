const setResponse = require('../../modules/response');
const user = require('../../models/user');

const userService = {
  register: async (data) => {
    const { email, password, nickname } = data;
    console.log(email, password, nickname);
    try {
      const isExistEmail = await user.findOne({
        where: { email },
      });

      if (isExistEmail) {
        return setResponse(409, '이미 가입된 email입니다.');
      }

      const isExistNickname = await user.findOne({
        where: { nickname },
      });

      if (isExistNickname) {
        return setResponse(409, '이미 가입된 nickname입니다.');
      }

      const newUser = await user.create({
        email,
        password,
        nickname,
      });

      return setResponse(201, '회원가입 성공', newUser);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userService;
