const express = require("express");
const router = express.Router(); // for render ejs
const URL = require("../models/url.js");

router.get("/", async (req, res) => {
  console.log(req.user);
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  console.log(allUrls);
  res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("login", { errors: null });
});

module.exports = router;
