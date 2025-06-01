const request = require('supertest');
const app = require('../server');

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'admin@mail.com', // замените на валидного пользователя
      password: 'admin',       // с соответствующим паролем
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

    expect(res.statusCode).toBe(200);
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
