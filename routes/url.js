const express = require("express");
const router = express.Router();

const {
  handleGenerateShortUrl,
  handleGetUrl,
  handleGetAnalysis,
  handleGetAllData,
  handleDelete,
} = require("../controllers/url.js");

router.post("/", handleGenerateShortUrl);
router.get("/api/all", handleGetAllData);
router.get("/:shortId", handleGetUrl);
router.get("/analysis/:shortId", handleGetAnalysis);
router.delete("/:redirectUrl", handleDelete);

module.exports = router;
