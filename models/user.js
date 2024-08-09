'use strict';
const { hash } = require('../Helper/Bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TripPlan,{
        foreignKey:"UserId"
      })
    }
  }
  User.init({
    Username: { type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Username required"
        },
        notNull:{
          msg: "Username required"
        }
      },
      defaultValue: "index_username"
    },
    Email: { type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Email is required"
        },
        notEmpty:{
          msg:"Email is required"
        },
        isEmail:{
          msg:"Incorrect email format"
        }
      },
      unique:{
        args:true,
        msg: "Email has already been taken"
      },
    },
    Password: { type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: "Password is required"
        },
        notNull:{
          msg: "Password is required"
        },
        len:{
          args: [6],
          msg: "Password is minimum 5 characters long"
        }
      }
    },
    Gender: { type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Gender"
        },
        notEmpty:{
          msg:"Gender"
        }
      },
      defaultValue: "Others"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((el)=>{
    el.Password = hash(el.Password)
  })
  return User;
};