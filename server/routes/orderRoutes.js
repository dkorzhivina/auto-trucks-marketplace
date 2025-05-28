const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createOrder } = require('../controllers/orderController');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создать заказ
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Заказ успешно создан
 *       401:
 *         description: Требуется авторизация
 */
router.post('/orders', authMiddleware, createOrder);

module.exports = router;
