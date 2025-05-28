router.put('/', authMiddleware, async (req, res) => {
  const { name, phone } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    user.name = name;
    user.phone = phone;
    await user.save();
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Ошибка обновления' });
  }
});
