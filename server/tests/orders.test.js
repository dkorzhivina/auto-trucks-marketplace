const request = require('supertest');
const app = require('../server');

let token;

beforeAll(async () => {
  const testEmail = `admin${Date.now()}@mail.com`;

  // Регистрируем администратора
  await request(app)
    .post('/api/auth/register')
    .send({
      email: testEmail,
      password: 'admin',
      name: 'Админ',
      phone: '1234567890',
      city: 'Москва',
      company: 'Admin Co',
    });

  // Входим для получения токена
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: testEmail,
      password: 'admin',
    });

  token = res.body.token;
});

describe('Orders API', () => {
  test('Создание нового заказа', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        truckId: 1, // убедись, что грузовик с ID 1 существует
        phone: '89990001234',
        comment: 'Тестовый заказ',
      });

    expect(res.statusCode).toBe(201); // ← исправлено с 200 на 201
    expect(res.body).toHaveProperty('id');
  });

  test('Получение списка заказов', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
