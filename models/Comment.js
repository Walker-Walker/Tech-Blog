const { Model, DataTypes } = require("sequelize"); //descructuring sequelize constructors
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    //columns will go here
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Comment;
