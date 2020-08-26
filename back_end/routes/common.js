var express = require("express");
var router = express.Router();
const s3 = require("../components/s3");
var mime = require("mime-types");

router.get("/fileUploadUrl", async function (req, res, next) {
  console.log("fileUploadUrl");
  const { mimetype, extension } = req.query;
  let path = `profile/test3.${extension}`;
  // let path = `test.png`
  const url = s3.generatePreSignedUrl({
    key: path,
    mimetype: mimetype,
  });
  console.log("url: ", url);
  // path = type === 'chat' ? `${config.aws.s3.frontPath}/${path}` : path
  res.status(200).json({ url, path });
});

//req => mimetype ex)image/png
router.get("/getExtension", async function (req, res, next) {
  console.log("getExtension");
  //console.log(req.query);
  const { type } = req.query;
  let extension = mime.extension(type);
  if (type == "hwp") {
    extension = "hwp";
  }
  // console.log('extension : ',extension)
  res.status(200).json({ extension: extension });
});

module.exports = router;
