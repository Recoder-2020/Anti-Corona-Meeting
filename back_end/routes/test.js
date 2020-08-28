const express = require("express");
const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    console.log("Req : ", req);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    console.log("Req : ", req.query);
    console.log(typeof req.query.idx);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.put("/update/:idx", async function (req, res, next) {
  try {
    console.log("Req : ", req.body);
    console.log("Req : ", req.params);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

module.exports = router;
