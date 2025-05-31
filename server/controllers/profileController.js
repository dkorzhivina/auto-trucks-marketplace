const { User } = require('../models');

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(user);
  } catch (err) {
    console.error('Ошибка получения профиля:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, city, company } = req.body;

    // 👇 Вот сюда вставь для отладки
    console.log('Обновляем:', { name, phone, city, company });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    user.name = name;
    user.phone = phone;
    user.city = city;
    user.company = company;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Ошибка при обновлении профиля:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

const handleSave = () => {
  console.log('Отправляем на сервер:', form); // 👈 временно для отладки
  axios
    .put('http://localhost:5000/api/profile', form, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setUser(res.data);
      setEditMode(false);
    })
    .catch(() => alert('Ошибка при обновлении'));
};



module.exports = { getProfile, updateProfile };
