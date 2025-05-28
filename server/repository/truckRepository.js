// repository/truckRepository.js

const { Truck } = require('../models');

// Репозиторий для получения грузовика по названию
async function findTruckByTitle(title) {
  return Truck.findOne({ where: { title } });
}

module.exports = {
  findTruckByTitle
};
