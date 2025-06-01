const request = require('supertest');
const app = require('../server');
const { User } = require('../models');

describe('Auth API', () => {
  const testEmail = `testuser${Date.now()}@mail.com`;
  const testPassword = '123456';

  beforeAll(async () => {
    await User.destroy({ where: {} }); // Очистка базы перед тестами
  });

  test('Регистрация нового пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: testEmail,
        password: testPassword,
        name: 'Test User',
        phone: '1234567890',
        city: 'Moscow',
        company: 'Truck Co',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Вход существующего пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
