const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Post = require("../../just-tech-news/models/Post");

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
  },
  {
    sequelize,
  }
);

module.exports = Post;
