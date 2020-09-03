const express = require("express");
const router = express.Router();

router.post("/findLocation", async function (req, res, next) {
  try {
    console.log("latitude : ", req.body.latitude);
    console.log("longitude : ", req.body.longitude);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

module.exports = router;
