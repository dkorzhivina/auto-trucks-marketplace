'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Role.associate = function(models) {
    Role.hasMany(models.User, { foreignKey: 'role_id' });
    Role.hasMany(models.Access, { foreignKey: 'role_id' });
  };

  return Role;
};
