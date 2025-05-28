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
app.use('/api', profileRoutes);
app.use('/api', truckRoutes);
app.use('/api', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/buyers', buyerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}\nSwagger доступен на http://localhost:${PORT}/api-docs`));
