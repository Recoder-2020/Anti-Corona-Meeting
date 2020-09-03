const express = require("express");
const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    console.log("Req : ", req.body);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    console.log("Req.query : ", req.query);
    console.log(typeof req.query.idx);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

router.put("/update/:idx", async function (req, res, next) {
  try {
    console.log("Req.boy : ", req.body);
    console.log("Req.path : ", req.params);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

module.exports = router;
