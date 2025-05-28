// factory/orderFactory.js

// Фабрика создания объекта заказа
function createOrder({ userId, truckId, phone, comment }) {
  return {
    userId,
    truckId,
    phone,
    comment,
    createdAt: new Date(),
  };
}

module.exports = createOrder;
