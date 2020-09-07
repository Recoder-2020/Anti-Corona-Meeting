const express = require("express");
const router = express.Router();

//view test router
router.get("/", (req, res, next) => {
  res.render("page/geolocationView", { title: "geolocation" });
});

module.exports = router;
