'use strict';

module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define('Truck', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payload_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enginePower: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    transmission: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['Новая', 'С пробегом']]
      }
    },
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    tableName: 'Trucks',
    underscored: false,
  });

  Truck.associate = function (models) {
    Truck.hasMany(models.Order, { foreignKey: 'truckId', as: 'orders' });
  };

  return Truck;
};
