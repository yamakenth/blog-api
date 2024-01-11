require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var cors = require("cors");
var path = require("path");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var { MONGO_DB_URI, NODE_ENV } = require("./environment");
require("./passport");

// connection to MongoDB
mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedtopology: true,
});
var db = mongoose.connection;
db.once("open", () =>
  console.log("MongoDB connection established successfully")
);
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

if (NODE_ENV === "production") {
  app.get("/", (_req, res) => res.redirect("/client/#/articles"));
  const __dirname1 = path.resolve();
  app.use(express.static(path.join(__dirname1, "../client/build")));
  app.use(express.static(path.join(__dirname1, "../client-admin/build")));
  app.get("/client/*", (_req, res) =>
    res.sendFile(
      path.resolve(__dirname1, "..", "client", "build", "index.html")
    )
  );
  app.get("/client-admin/*", (_req, res) =>
    res.sendFile(
      path.resolve(__dirname1, "..", "client-admin", "build", "index.html")
    )
  );
} else {
  app.use("/", indexRouter);
}

module.exports = app;
