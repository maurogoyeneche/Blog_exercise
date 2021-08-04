const faker = require("faker");
const { Article, Author } = require("../models");
const _ = require("lodash");
let imagenesPrueba = [
  "/img/home-bg.jpg",
  "/img/about-bg.jpg",
  "/img/contact-bg.jpg",
  "/img/post-bg.jpg",
  "/img/post-sample-image.jpg",
];

faker.locale = "es";

module.exports = async () => {
  const articles = [];

  for (let i = 0; i < 100; i++) {
    articles.push({
      title: faker.lorem.sentence(5),
      content: faker.lorem.paragraphs(2),
      img: _.sample(imagenesPrueba),
      userId: Math.ceil(Math.random() * 10),
    });
  }

  await Article.bulkCreate(articles);
  console.log("[Database] Se corrió el seeder de Articles.");
};
