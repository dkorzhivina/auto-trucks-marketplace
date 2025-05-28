const { Truck } = require('../models');
const { filterByBrand } = require('../strategy/truckFilter');
const { findTruckByTitle } = require('../repository/truckRepository');

const getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.findAll();
    res.json(trucks);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения грузовиков' });
  }
};

const getTruckById = async (req, res) => {
  try {
    const truck = await Truck.findByPk(req.params.id);
    if (!truck) return res.status(404).json({ message: 'Грузовик не найден' });
    res.json(truck);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения модели' });
  }
};

module.exports = { getAllTrucks, getTruckById };

const createTruck = async (req, res) => {
  try {
    const { title, brand, price, imageUrl } = req.body;

    const truck = await Truck.create({ title, brand, price, imageUrl });

    res.status(201).json(truck);
  } catch (err) {
    console.error('Ошибка при добавлении грузовика:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// ✏️ Обновить существующий грузовик
const updateTruck = async (req, res) => {
  try {
    const truck = await Truck.findByPk(req.params.id);
    if (!truck) {
      return res.status(404).json({ message: 'Грузовик не найден' });
    }

    const { title, brand, price, imageUrl } = req.body;

    truck.title = title ?? truck.title;
    truck.brand = brand ?? truck.brand;
    truck.price = price ?? truck.price;
    truck.imageUrl = imageUrl ?? truck.imageUrl;

    await truck.save();

    res.json(truck);
  } catch (err) {
    console.error('Ошибка при обновлении грузовика:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
};
