const express = require('express');
const router = express.Router();
const { Truck, User } = require('../models');
const { Op } = require('sequelize');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const controller = require('../controllers/statsController');

/**
 * @swagger
 * /stats/low-mileage:
 *   get:
 *     summary: Грузовики с пробегом < 30 000 км
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/low-mileage', async (req, res) => {
  const trucks = await Truck.findAll({ where: { mileage: { [Op.lt]: 30000 } } });
  res.json(trucks);
});

/**
 * @swagger
 * /stats/new:
 *   get:
 *     summary: Новые автомобили
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/new', async (req, res) => {
  const trucks = await Truck.findAll({ where: { condition: 'Новая' } });
  res.json(trucks);
});

/**
 * @swagger
 * /stats/most-expensive:
 *   get:
 *     summary: Самый дорогой автомобиль
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/most-expensive', async (req, res) => {
  const truck = await Truck.findOne({
    order: [['price', 'DESC']],
    limit: 1
  });
  res.json(truck);
});

/**
 * @swagger
 * /stats/total-value:
 *   get:
 *     summary: Общая стоимость всех авто
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/total-value', async (req, res) => {
  const total = await Truck.sum('price');
  res.json({ total });
});

/**
 * @swagger
 * /stats/buyers-count:
 *   get:
 *     summary: Кол-во пользователей (покупателей)
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/buyers-count', async (req, res) => {
  const count = await User.count();
  res.json({ buyers: count });
});

/**
 * @swagger
 * /stats/admin-only-endpoint:
 *   get:
 *     summary: Только для администратора
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: Доступ запрещён
 */
router.get('/admin-only-endpoint', authMiddleware, isAdmin, controller.adminFunc);

module.exports = router;
