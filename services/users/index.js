const setResponse = require('../../modules/response');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
const jwtModule = require('../../modules/jwt');
const code = require('../../modules/status-code');
const saltRounds = 10;

const userService = {
  register: async (data) => {
    const { email, password, nickname } = data;
    try {
      const isExistEmail = await user.findOne({
        where: { email },
      });

      if (isExistEmail) {
        return setResponse(code.CONFLICT, '이미 가입된 email입니다.');
      }

      const isExistNickname = await user.findOne({
        where: { nickname },
      });

      if (isExistNickname) {
        return setResponse(code.CONFLICT, '이미 가입된 nickname입니다.');
      }

      const encryptedPassword = bcrypt.hashSync(password, saltRounds);

      const newUser = await user.create({
        email,
        password: encryptedPassword,
        nickname,
      });
      console.log('newUser: ', newUser);

      const userId = newUser.getDataValue('id');

      const payload = { userId };

      const token = jwtModule.create(payload);

      return setResponse(code.CREATED, '회원가입 성공', { token });
    } catch (error) {
      console.error(error);
    }
  },
  login: async (data) => {
    const { email, password } = data.body;

    try {
      const userInfo = await user.findOne({
        where: { email },
        attributes: ['id', 'password'],
      });

      if (!userInfo) {
        return setResponse(code.BAD_REQUEST, '잘못된 이메일');
      } else {
        const encodedPassword = userInfo.dataValues.password;

        const isValidPassword = bcrypt.compareSync(password, encodedPassword);

        if (!isValidPassword) {
          return setResponse(code.BAD_REQUEST, '잘못된 비밀번호');
        }
        return setResponse(code.OK, '로그인 성공');
      }
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = userService;
