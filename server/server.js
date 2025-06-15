const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { swaggerSpec, swaggerUi } = require('./swagger');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const truckRoutes = require('./routes/truckRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/stats');
const buyerRoutes = require('./routes/buyers');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', truckRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Окружение: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Swagger: http://localhost:${PORT}/api-docs`);
  });
}

const { sequelize } = require('./models');
console.log('Подключение к БД:', sequelize.config.database);


module.exports = app;
