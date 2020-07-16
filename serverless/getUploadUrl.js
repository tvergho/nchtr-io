const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const uploadURLs = [];
  const acceptedFilenames = [];

  for (let i = 0; i < data.fileTypes.length; i += 1) {
    const actionId = uuid();
    const filename = `${actionId}.${data.extensions[i]}`;

    const s3Params = {
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      ContentType: data.fileTypes[i],
      ACL: 'public-read',
    };

    const uploadURL = s3.getSignedUrl('putObject', s3Params);
    uploadURLs.push(uploadURL);
    acceptedFilenames.push(filename);
  }

  const token = jwt.sign({ acceptedFilenames }, process.env.JWT_SECRET, { expiresIn: 3600 });

  return new Promise((resolve, reject) => {
    resolve({
      statusCode: 200,
      isBase64Encoded: false,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        token,
        uploadURLs,
        acceptedFilenames,
      }),
    });
  });
};
