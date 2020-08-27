const { Model, DataTypes, Sequelize, INTEGER } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcyrpt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement:true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [4]
                }
            },
            sequelize
        
    }
)