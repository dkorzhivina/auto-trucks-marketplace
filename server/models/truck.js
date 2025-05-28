'use strict';
module.exports = (sequelize, DataTypes) => {
  const Truck = sequelize.define('Truck', {
    title: DataTypes.STRING,
    brand: DataTypes.STRING,
    description: DataTypes.TEXT,
    payload_capacity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    image_url: DataTypes.STRING,
    year: DataTypes.INTEGER,
    enginePower: DataTypes.INTEGER,
    transmission: DataTypes.STRING,
    condition: DataTypes.STRING,  // 'Новая' или 'С пробегом'
    mileage: DataTypes.INTEGER
  }, {});

  Truck.associate = function (models) {
    Truck.hasMany(models.Order, { foreignKey: 'truckId' });
  };

  return Truck;
};
