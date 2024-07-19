const shortid = require("shortid");
const URL = require("../models/url.js");

async function handleGenerateShortUrl(req, res) {
  const { url } = req.body;
  const checkMongo = await URL.findOne({ redirectUrl: url });

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
    createdBy: req.user._id,
  });

  const allUrls = await URL.find({ createdBy: req.user._id });

  // console.log(allUrls);

  return res.render("home", { urls: allUrls, shortId: sId });
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

  if (!entry) {
    return res.status(404).send("Url Not found");
  }

  res.redirect(entry.redirectUrl);
}

module.exports = {
  handleGenerateShortUrl,
  handleGetUrl,
};
