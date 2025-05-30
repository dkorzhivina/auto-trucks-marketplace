const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

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

router.get('/', authMiddleware, orderController.getUserOrders);
router.post('/', authMiddleware, orderController.createOrder);
router.post('/cancel/:id', authMiddleware, orderController.cancelOrder);
router.post('/repeat/:id', authMiddleware, orderController.repeatOrder);


module.exports = router;
