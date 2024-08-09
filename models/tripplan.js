'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TripPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TripPlan.belongsTo(models.User,{
        foreignKey: "UserId"
      })

      TripPlan.belongsTo(models.Destination,{
        foreignKey: "DestinationId"
      })
    }
  }
  TripPlan.init({
    Title: {type :DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Title is required"
        },
        notEmpty:{
          msg: "Title is required"
        }
      }
    },
    Itineraries:{ type:DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Itineraries is required"
        },
        notEmpty:{
          msg: "Itineraries is required"
        }
      }
    },
    UserId:{type :DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: "UserId is required"
        },
        notEmpty:{
          msg: "UserId is required"
        }
      }
    },
    DestinationId:{type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull:{
          msg: "DestinationId is required"
        },
        notEmpty:{
          msg: "DestinationId is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'TripPlan',
  });
  return TripPlan;
};