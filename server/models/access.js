'use strict';
module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define('Access', {
    resource: DataTypes.STRING,
    permission: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {});

  Access.associate = function(models) {
    Access.belongsTo(models.Role, { foreignKey: 'role_id' });
  };

  return Access;
};
