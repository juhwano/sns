const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const jwtModule = {
  //jwt 토큰 생성
  create: (payload) => {
    const option = {
      algorithm: process.env.ALGORITHM,
      expiresIn: process.env.EXPIRES_IN,
      issuer: process.env.ISSUER,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, option);
    return token;
  },
  //jwt 토큰 검증
  verify: (token) => {
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      console.error(error);
      if (error.message === 'jwt expired') {
        console.log('expired token');
        return -1;
      } else if (error.message === 'invalid token') {
        console.log('invalid token');
        return -2;
      } else {
        console.log('error token');
        return -3;
      }
    }
    console.log('decoded 완료', decoded);

    return decoded;
  },
};

module.exports = jwtModule;
