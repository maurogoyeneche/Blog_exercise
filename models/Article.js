module.exports = (sequelize, Model, DataTypes) => {
  class Article extends Model {}

  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      img: {
        type: DataTypes.STRING(200),
      },
    },
    {
      sequelize,
      modelName: "article",
    }
  );

  return Article;
};
