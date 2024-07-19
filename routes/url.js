const express = require("express");
const router = express.Router();

const {
  handleGenerateShortUrl,
  handleGetUrl,
} = require("../controllers/url.js");

router.post("/", handleGenerateShortUrl);

router.get("/:shortId", handleGetUrl);

module.exports = router;
