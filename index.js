const express = require("express");
const app = express();
const PORT = 3000;

const connectMongoDB = require("./connection.js");
const path = require("path");
const ejs = require("ejs");

const urlRouter = require("./routes/url.js");
const staticRouter = require("./routes/staticRoute.js");
const userRouter = require("./routes/user.js");

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(() => {
  console.log("Mongo db is connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/url", urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`app is running on port no ${PORT}`);
});
