const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

const connectMongoDB = require("./connection.js");
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const {
  restrictToLoggedinUserOnly,
  checkAuth,
} = require("./middlewares/auth.js");

const urlRouter = require("./routes/url.js");
const staticRouter = require("./routes/staticRoute.js");
const userRouter = require("./routes/user.js");

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(() => {
  console.log("Mongo db is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouter);

app.listen(PORT, () => {
  console.log(`app is running on port no ${PORT}`);
});
