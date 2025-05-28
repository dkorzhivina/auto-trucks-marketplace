const express = require('express');
const router = express.Router();
const { Buyer, Truck } = require('../models');
const { Op } = require('sequelize');

// 🔹 Получить всех покупателей
router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.findAll();
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения покупателей', error: err.message });
  }
});

// 🔹 Добавить нового покупателя
router.post('/', async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.status(201).json(buyer);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании', error: err.message });
  }
});

// 🔹 Удалить покупателя по ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Buyer.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ message: 'Покупатель удалён' });
    } else {
      res.status(404).json({ message: 'Покупатель не найден' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления', error: err.message });
  }
});

// 🔍 Найти покупателей, которым подходит авто по ID
router.get('/match/:truckId', async (req, res) => {
  const { truckId } = req.params;

  try {
    const truck = await Truck.findByPk(truckId);
    if (!truck) return res.status(404).json({ message: 'Автомобиль не найден' });

    const matches = await Buyer.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { preferredBrand: truck.brand },
              { preferredBrand: null },
              { preferredBrand: '' }
            ]
          },
          {
            [Op.or]: [
              { preferredModel: truck.title },
              { preferredModel: null },
              { preferredModel: '' }
            ]
          },
          {
            [Op.or]: [
              { preferredYear: { [Op.lte]: truck.year } },
              { preferredYear: null }
            ]
          },
          {
            [Op.or]: [
              { preferredTransmission: truck.transmission },
              { preferredTransmission: null },
              { preferredTransmission: '' }
            ]
          },
          {
            [Op.or]: [
              { preferredCondition: truck.condition },
              { preferredCondition: null },
              { preferredCondition: '' }
            ]
          },
          {
            maxPrice: { [Op.gte]: truck.price }
          }
        ]
      }
    });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при подборе покупателей', error: err.message });
  }
});

module.exports = router;
