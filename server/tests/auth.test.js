const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  const testEmail = `testuser${Date.now()}@mail.com`;

  test('Регистрация нового пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: testEmail,
        password: '123456',
        phone: '89998887766',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('Вход существующего пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: '123456',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
