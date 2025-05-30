const { Order, Truck } = require('../models');

const createOrder = async (req, res) => {
  const { truckId, phone, comment } = req.body;

  try {
    const truck = await Truck.findOne({ where: { id: truckId } });
    if (!truck) {
      return res.status(404).json({ message: 'Грузовик не найден' });
    }

    const order = await Order.create({
      userId: req.user.id,
      truckId: truck.id,
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

const cancelOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findOne({ where: { id, userId: req.user.id } });
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    order.comment = `[ОТМЕНЁН] ${order.comment}`;
    await order.save();

    res.json({ message: 'Заказ отменён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при отмене заказа' });
  }
};

const repeatOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const oldOrder = await Order.findOne({ where: { id, userId: req.user.id } });
    if (!oldOrder) {
      return res.status(404).json({ message: 'Исходный заказ не найден' });
    }

    const newOrder = await Order.create({
      userId: req.user.id,
      truckId: oldOrder.truckId,
      phone: oldOrder.phone,
      comment: `[Повтор] ${oldOrder.comment}`,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при повторе заказа' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  cancelOrder,
  repeatOrder,
};
