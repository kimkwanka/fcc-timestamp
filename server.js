const express = require('express');
const http = require("http");

const app = express();

const port = 8080;

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.get("/", function(req, res, next) {
  res.render("index", {message: 'Index Page'});  
});

app.get("/:something", function(req, res, next) {
  res.render("index", {message: JSON.stringify({test: req.params.something})});
});

app.get("*", function(req, res) {
  res.render("404", {});
});

app.listen(port);
