'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.hasMany(models.TripPlan,{
        foreignKey: "DestinationId"
      })
    }
  }
  Destination.init({
    Name: {type :DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "Name is required"
        },
        notEmpty:{
          msg: "Name is required"
        }
      }
    },
    MainImage: {type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "MainImg is required"
        },
        notEmpty:{
          msg: "MainImg is required"
        }
      }
    },
    Overview: { type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "OverView is required"
        },
        notEmpty:{
          msg: "OverView is required"
        }
      }
    },
    OverviewImg: { type : DataTypes.STRING, 
      allowNull:false,
      validate:{
        notNull: {
          msg: "OverviewImg is required"
        },
        notEmpty:{
          msg: "OverviewImg is required"
        }
      }},
    Culture: { type : DataTypes.STRING, 
      allowNull:false,
      validate:{
        notNull: {
          msg: "Culture is required"
        },
        notEmpty:{
          msg: "Culture is required"
        }
      }},
    CultureImg: { type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "CultureImg is required"
        },
        notEmpty:{
          msg: "CultureIm is required"
        }
      }},
    Food: { type : DataTypes.STRING, 
      allowNull:false,
      validate:{
        notNull: {
          msg: "Food is required"
        },
        notEmpty:{
          msg: "Food is required"
        }
      }},
    FoodImg: { type : DataTypes.STRING, 
      allowNull:false,
      validate:{
        notNull: {
          msg: "FoodImg is required"
        },
        notEmpty:{
          msg: "FoodImg is required"
        }
      }},
    Site: { type : DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull: {
          msg: "Site is required"
        },
        notEmpty:{
          msg: "Site is required"
        }
      }},
    SiteImg:{type :  DataTypes.STRING, 
      allowNull:false,
      validate:{
        notNull: {
          msg: "SiteImg is required"
        },
        notEmpty:{
          msg: "SiteImg is required"
        }
      }}
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};