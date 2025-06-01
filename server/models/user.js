'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    company: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
  }, {});

  User.associate = function(models) {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
      as: 'roleInfo',
    });
  };

  return User;
};
