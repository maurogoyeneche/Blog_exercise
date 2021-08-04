const { Article, Comment, User } = require("../models");
const formidable = require("formidable");
const faker = require("faker");
const imgRandom = require("./pagesController").imagenFondoRandom;
faker.locale = "en";

async function template(req, res) {
  res.render("admin/createArticle");
}
async function json(req, res) {
  const json = await Article.findAll();
  res.json(json);
}

async function store(req, res) {
  const sendMail = require("../utils/mail.js");
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const path = require("path");
    const imgName = path.basename(files.image.path);
    if (files.image.name === "") {
      const fs = require("fs");
      fs.unlink(files.image.path, () => {});
    }

    const [user, created] = await User.findOrCreate({
      where: {
        email: fields.email,
      },
      defaults: {
        firstname: fields.firstname,
        lastname: fields.lastname,
      },
    });
    await Article.create({
      title: fields.title,
      content: fields.content,
      img: "/img/" + imgName,
      userId: user.id,
    });
    res.redirect("/");
    /*     sendMail(fields.title, fields.content); */
  });
}

async function modifyAccess(req, res) {
  const article = await Article.findByPk(req.params.id);
  const comments = await Comment.findAll({
    where: {
      articleId: req.params.id,
    },
  });

  res.render("admin/adminArticle", { article, comments });
}

async function modify(req, res) {
  const article = await Article.findByPk(req.params.id);
  res.render("admin/modifyArticle", { article });
}

async function update(req, res) {
  await Article.update(req.body, {
    where: {
      id: req.body.articleId,
      userId: req.user.id,
    },
  });

  res.redirect("/admin/index");
}

async function comment(req, res) {
  const id = req.params.id;
  const { firstname, content } = req.body;
  if (
    firstname.length >= 1 &&
    firstname.length <= 50 &&
    content.length >= 1 &&
    content.length <= 150
  ) {
    const comment = [];
    comment.push({
      user: firstname,
      content,
      articleId: id,
    });
    await Comment.bulkCreate(comment);
  }
  res.redirect(`/articulo/${id}`);
}
async function destroy(req, res) {
  const deleted = await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (deleted) {
    res.send(true);
  } else {
    res.send(false);
  }
}

async function show(req, res) {
  const user = await User.findByPk(req.params.id);
  const articles = await Article.findAll({
    where: {
      userId: user.id,
    },
  });
  res.render("admin/indexAutor", { articles, imgRandom, user });
}

module.exports = {
  template,
  store,
  modify,
  update,
  modifyAccess,
  comment,
  destroy,
  show,
  json,
};
