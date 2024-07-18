const USER = require("../models/users");
const URL = require("../models/url.js");

async function handleUserSignup(req, res) {
  const { userName, email, password } = req.body;
  await USER.create({
    userName,
    email,
    password,
  });
  return res.redirect("/login");
}

async function handleUserLogin(req, res) {
  const { userName, email, password } = req.body;
  const user = await USER.findOne({
    email,
    password,
  });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or password",
    });
  }
  return res.render("/");
}

module.exports = { handleUserSignup, handleUserLogin };
