const express = require("express");

module.exports = (app) => {
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.set("view engine", "ejs");
};
