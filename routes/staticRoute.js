const express = require("express");
const router = express.Router(); // for render ejs
const URL = require("../models/url.js");

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

module.exports = router;
