// server/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Инициализация приложения
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключи маршруты
const authRoutes = require('./routes/authRoutes');     // пример
const orderRoutes = require('./routes/orderRoutes');   // пример

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Экспорт для тестов
module.exports = app;
