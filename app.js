const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
const indexRouter = require('./routes/index');

const { sequelize } = require('./models');

const app = express();

app.set('port', process.env.PORT || 3000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
//x-www-form-urlencoded를 사용하려면 필요
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트 연결 완료');
});
