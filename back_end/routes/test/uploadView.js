const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("page/uploadView", { title: "fileUpload" });
});

module.exports = router;