const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const { Truck, Order, User } = require('../models');

// 🔍 Получить все заказы
router.get('/orders', auth, isAdmin, async (req, res) => {
  const orders = await Order.findAll({ include: [Truck, User] });
  res.json(orders);
});

// 🚚 Получить все грузовики
router.get('/trucks', auth, isAdmin, async (req, res) => {
  const trucks = await Truck.findAll();
  res.json(trucks);
});

// ➕ Добавить грузовик
router.post('/trucks', auth, isAdmin, async (req, res) => {
  const truck = await Truck.create(req.body);
  res.status(201).json(truck);
});

// ✏️ Редактировать грузовик
router.put('/trucks/:id', auth, isAdmin, async (req, res) => {
  const truck = await Truck.findByPk(req.params.id);
  if (!truck) return res.status(404).json({ message: 'Не найдено' });
  await truck.update(req.body);
  res.json(truck);
});

// ❌ Удалить грузовик
router.delete('/trucks/:id', auth, isAdmin, async (req, res) => {
  const truck = await Truck.findByPk(req.params.id);
  if (!truck) return res.status(404).json({ message: 'Не найдено' });
  await truck.destroy();
  res.json({ message: 'Удалено' });
});

module.exports = router;
