'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    truckId: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    comment: DataTypes.TEXT,
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});

  order.associate = function(models) {
    order.belongsTo(models.User, { foreignKey: 'userId' });
    order.belongsTo(models.Truck, { foreignKey: 'truckId' });
    order.belongsTo(models.Status, { foreignKey: 'status_id' }); // Добавлена связь
  };

  return order;
};
