const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var indexRouter = require("./api/routes/index");
const mongoose = require("mongoose");
let config;

// if (process.env.NODE_ENV === "production") {
//   config = {
//     USERNAME: process.env.DB_USERNAME,
//     PASSWORD: process.env.DB_PASSWORD,
//   };
// } else {
//   config = require("./api/config/config");
// }

// const url = `mongodb+srv://${config.USERNAME}:${config.PASSWORD}@cluster0.7mtj9.mongodb.net/anecdotalstudy?retryWrites=true&w=majority`;

const url= "mongodb+srv://subham2:12345@cluster0.t4iwt.mongodb.net/study2?retryWrites=true&w=majority";
console.log(url);
mongoose.connect(url);
mongoose.promise = global.Promise;

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
  })
);

app.use("/api", indexRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
