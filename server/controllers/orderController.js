const { Order, Truck } = require('../models');
const createOrderObj = require('../factory/orderFactory');

const createOrder = async (req, res) => {
  const { truckId, phone, comment } = req.body;

  try {
    const truck = await Truck.findOne({ where: { id: truckId } }); // ✅ ищем по id
    if (!truck) {
      console.error('Грузовик не найден по ID:', truckId); // ✅ уточнено
      return res.status(404).json({ message: 'Грузовик не найден' });
    }

    const order = await Order.create({
      userId: req.user.id,
      truckId: truck.id, // ✅ передаём настоящий ID
      phone,
      comment,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error('Ошибка при создании заказа:', err);
    res.status(500).json({ message: 'Ошибка при создании заказа' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: { model: Truck },
      order: [['createdAt', 'DESC']],
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения заказов' });
  }
};

module.exports = { createOrder, getUserOrders };
