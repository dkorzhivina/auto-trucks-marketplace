'use strict';
module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    preferredBrand: DataTypes.STRING,
    preferredModel: DataTypes.STRING,
    preferredYear: DataTypes.INTEGER,
    preferredTransmission: DataTypes.STRING,
    preferredCondition: DataTypes.STRING,
    maxPrice: DataTypes.FLOAT
  }, {});
  Buyer.associate = function(models) {
    // пока связей нет, но можно будет связать в будущем
  };
  return Buyer;
};
