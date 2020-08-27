const express = require("express");
const router = express.Router();

router.get("/:idx", async function (req, res, next) {
  try {
    const query = req.query;
    const params = req.params;
    console.log(query);
    console.log(params);
    res.status(200).send(`query : ${query.query1}`);
  } catch (err) {
    console.log("err : ", err);
    next(err);
  }
});

module.exports = router;
