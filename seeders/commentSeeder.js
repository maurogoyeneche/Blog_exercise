const faker = require("faker");
const { Comment } = require("../models");

faker.locale = "en";

module.exports = async () => {
  const comment = [];

  for (let i = 0; i < 300; i++) {
    comment.push({
      user: faker.name.firstName(),
      content: faker.lorem.words(30),
      articleId: Math.ceil(Math.random() * 100),
    });
  }

  await Comment.bulkCreate(comment);
  console.log("[Database] Se corrió el seeder de comment.");
};
