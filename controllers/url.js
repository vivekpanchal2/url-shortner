const shortid = require("shortid");
const URL = require("../models/url.js");

async function handleGetAllData(req, res) {
  const data = await URL.find({});
  res.json(data);
}

async function handleGenerateShortUrl(req, res) {
  const { url } = req.body;
  const checkMongo = await URL.findOne({ redirectUrl: url });

  console.log(checkMongo);

  if (checkMongo) {
    return res.render("home", { shortId: checkMongo.shortId });
  }

  if (!url) {
    return res.status(400).json({ msg: "url is required" });
  }

  const sId = shortid(8);

  await URL.create({
    shortId: sId,
    redirectUrl: url,
    visitedHistory: [],
  });

  return res.render("home", { shortId: sId });
}

async function handleGetUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitedHistory: { timestamp: Date.now() },
      },
    }
  );
  console.log("entry is" + entry);

  if (!entry) {
    return res.status(404).send("Url Not found");
  }

  res.redirect(entry.redirectUrl);
}

async function handleGetAnalysis(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });

  return res.render("analysis", {
    timestamp: entry.visitedHistory.length,
  });
}

async function handleDelete(req, res) {
  try {
    const redirectUrl = req.params.redirectUrl;
    const result = await URL.deleteMany({ redirectUrl });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No entries found to delete" });
    }

    return res.json({
      message: `${result.deletedCount} entries deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting entries" });
  }
}

module.exports = {
  handleGenerateShortUrl,
  handleGetUrl,
  handleGetAnalysis,
  handleGetAllData,
  handleDelete,
};
