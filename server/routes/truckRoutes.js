const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const {
  getAllTrucks,
  getTruckById,
  createTruck,
  updateTruck,
} = require('../controllers/truckController');

/**
 * @swagger
 * /trucks:
 *   get:
 *     summary: Получить список всех грузовиков
 *     tags: [Trucks]
 *     responses:
 *       200:
 *         description: Успешно
 */
router.get('/trucks', getAllTrucks);

/**
 * @swagger
 * /trucks/{id}:
 *   get:
 *     summary: Получить грузовик по ID
 *     tags: [Trucks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Успешно
 *       404:
 *         description: Грузовик не найден
 */
router.get('/trucks/:id', getTruckById);

/**
 * @swagger
 * /trucks:
 *   post:
 *     summary: Добавить новый грузовик (только для админа)
 *     tags: [Trucks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Truck'
 *     responses:
 *       200:
 *         description: Успешно создан
 *       403:
 *         description: Доступ запрещён
 */
router.post('/trucks', authMiddleware, isAdmin, createTruck);

/**
 * @swagger
 * /trucks/{id}:
 *   put:
 *     summary: Обновить грузовик (только для админа)
 *     tags: [Trucks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Truck'
 *     responses:
 *       200:
 *         description: Успешно обновлено
 *       403:
 *         description: Доступ запрещён
 */
router.put('/trucks/:id', authMiddleware, isAdmin, updateTruck);

module.exports = router;
