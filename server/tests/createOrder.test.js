const request = require('supertest');
const app = require('../server'); // путь к вашему express-приложению
const { sequelize, Order } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('POST /api/orders', () => {
  let token;

  beforeAll(async () => {
    // эмулируем JWT токен с ролью user (или admin, если нужно)
    token = jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Подключение к базе данных, если нужно
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a new order successfully', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        truckId: 1,
        phone: '89998887766',
        comment: 'Хочу заказать быстро',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('truckId', 1);
  });

  it('should fail without token', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        truckId: 1,
        phone: '89998887766',
        comment: 'Без токена',
      });

    expect(response.statusCode).toBe(401);
  });
});