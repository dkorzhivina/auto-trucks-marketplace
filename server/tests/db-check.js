const { User, sequelize } = require('../models');

(async () => {
  try {
    await sequelize.authenticate();
    const columns = await sequelize.getQueryInterface().describeTable('Users');
    console.log(columns);
    process.exit();
  } catch (err) {
    console.error('Ошибка:', err);
    process.exit(1);
  }
})();
