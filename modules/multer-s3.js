const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const path = require('path');
aws.config.loadFromPath(__dirname + '/../config/aws-s3-config.json');

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'loid3',
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
      // cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});

module.exports = upload;
