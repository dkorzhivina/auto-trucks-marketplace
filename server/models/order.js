'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    truckId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {});

  order.associate = function(models) {
    order.belongsTo(models.User, { foreignKey: 'userId' });
    order.belongsTo(models.Truck, { foreignKey: 'truckId' });
  };

  return order;
};
