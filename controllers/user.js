const USER = require("../models/users");
const URL = require("../models/url.js");
const { getUser, setUser } = require("../service/auth");

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
      errors: "Invalid Username or password",
    });
  }

  const token = await setUser(user);
  // console.log(token);
  res.cookie("uid", token);

  return res.redirect("/");
}

module.exports = { handleUserSignup, handleUserLogin };
