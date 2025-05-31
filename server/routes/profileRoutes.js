const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { User } = require('../models');
const { getProfile, updateProfile } = require('../controllers/profileController');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'email', 'name', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// PUT /api/profile — обновление профиля
// PUT /api/profile — обновление профиля
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, city, company } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.city = city || user.city;
    user.company = company || user.company;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error('Ошибка при обновлении профиля:', err);
    res.status(500).json({ message: 'Ошибка при обновлении профиля' });
  }
});



module.exports = router;
