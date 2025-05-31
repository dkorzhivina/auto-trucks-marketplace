const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { swaggerSpec, swaggerUi } = require('./swagger');  // ✅ Swagger

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const truckRoutes = require('./routes/truckRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/stats');
const buyerRoutes = require('./routes/buyers');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Swagger UI по адресу /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', truckRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));


const PORT = process.env.PORT || 5000;

// ✅ Добавлено условие для автотестов
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Swagger доступен на http://localhost:${PORT}/api-docs`);
  });
}

// ✅ Экспортируем app для supertest
module.exports = app;