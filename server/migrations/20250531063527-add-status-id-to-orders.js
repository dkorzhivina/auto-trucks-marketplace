await queryInterface.addColumn('Orders', 'status_id', {
  type: Sequelize.INTEGER,
  references: {
    model: 'Statuses',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});
