'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Проверка наличия столбца (альтернатива – руками убрать миграцию из SequelizeMeta)
    const table = await queryInterface.describeTable('Orders');
    if (!table.status_id) {
      await queryInterface.addColumn('Orders', 'status_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Statuses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'status_id');
  }
};
