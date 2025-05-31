const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Доступ запрещён. Только для администратора.' });
  }
  next();
};

module.exports = isAdmin;
