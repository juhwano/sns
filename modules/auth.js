const jwtModule = require('./jwt');
const setResponse = require('./response');
const code = require('./status-code');
const user = require('../models/user');

const authModule = {
  loggedIn: async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.json(setResponse(code.UNAUTHORIZED, '토큰 없음'));
    }

    const decoded = jwtModule.verify(token);

    if (decoded === -1) {
      return res.json(setResponse(code.UNAUTHORIZED, '만료된 토큰'));
    } else if (decoded === -2) {
      return res.json(setResponse(code.UNAUTHORIZED, '유효하지 않은 토큰'));
    } else if (decoded === -3) {
      return res.json(setResponse(code.UNAUTHORIZED, '토큰 에러'));
    }

    let userInfo;

    try {
      userInfo = await user.findOne({
        where: { id: decoded.userId },
      });
    } catch (error) {
      return setResponse(code.INTERNAL_SERVER_ERROR, '유효하지 않은 유저');
    }

    req.userInfo = userInfo;
    req.token = decoded;

    next();
  },
};

module.exports = authModule;
