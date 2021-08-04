const { User } = require("../models");
const bcrypt = require("bcryptjs");

async function showLogIn(req, res) {
  res.render("login");
}
async function showRegister(req, res) {
  res.render("register");
}

async function storeRegister(req, res) {
  if (
    req.body.username === "" ||
    req.body.firstname === "" ||
    req.body.lastname === "" ||
    req.body.email === "" ||
    req.body.password === ""
  ) {
    res.send("Debe completar todos los campos");
  } else if (
    await User.findOne({
      where: {
        username: req.body.username,
      },
    })
  ) {
    res.send('alert("Este usuario ya existe")');
  } else {
    User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });
    res.redirect("/");
  }
}

// Handlers para User...
// ...
module.exports = {
  showLogIn,
  showRegister,
  storeRegister,
};
