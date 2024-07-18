const express = require("express");
const router = express.Router(); // for render ejs
const URL = require("../models/url.js");

router.get("/home", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
