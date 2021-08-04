const { Article, Comment, User } = require("../models");
const _ = require("lodash");
const imagenesPrueba = [
  "/img/home-bg.jpg",
  "/img/about-bg.jpg",
  "/img/contact-bg.jpg",
  "/img/post-bg.jpg",
  "/img/post-sample-image.jpg",
];
const imagenFondoRandom = _.sample(imagenesPrueba);

async function showHome(req, res) {
  const articles = await Article.findAll();
  const users = await User.findAll();
  res.render("index", { articles, imagenFondoRandom, users });
}

async function showArticle(req, res) {
  const article = await Article.findByPk(req.params.id);
  const comments = await Comment.findAll({
    where: {
      articleId: req.params.id,
    },
  });
  res.render("article", { article, comments });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  const users = await Users.findAll();
  res.render("about", { users });
}

async function showHomeAdmin(req, res) {
  const articles = await Article.findAll();
  const users = await User.findAll();
  res.render("admin/adminIndex", { articles, users, imagenFondoRandom });
}
async function showUsersAdmin(req, res) {
  const articles = await Article.findAll();
  const users = await User.findAll();
  res.render("admin/adminUsers", { articles, users, imagenFondoRandom });
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showArticle,
  showContact,
  showAboutUs,
  showHomeAdmin,
  imagenFondoRandom,
  showUsersAdmin,
};
