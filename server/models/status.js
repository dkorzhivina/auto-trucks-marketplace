'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Status.associate = function(models) {
    Status.hasMany(models.Order, { foreignKey: 'status_id' });
  };

  return Status;
};
