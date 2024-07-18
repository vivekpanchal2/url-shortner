const USER = require("../models/users");
const URL = require("../models/url");

async function handleUserSignup(req, res) {
  const allUrls = await URL.find({});
  const { userName, email, password } = req.body;
  await USER.create({
    userName,
    email,
    password,
  });
  return res.render("home", { urls: allUrls });
}

module.exports = handleUserSignup;
