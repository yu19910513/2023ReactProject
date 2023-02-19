const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;

const config_aws = {
  accessKeyId,
  secretAccessKey,
  region,
};

const s3 = new S3(config_aws);

function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucket,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

function getFile(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucket,
  };

  return s3.getObject(downloadParams).createReadStream();
}

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create an instance of the multer middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("image");

module.exports = { uploadFile, getFile, upload };
