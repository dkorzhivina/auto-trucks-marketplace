const isAdmin = require('../middleware/isAdmin');

module.exports = function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next(); // ✅ Разрешаем доступ
  }
  return res.status(403).json({ message: 'Доступ запрещён: требуется роль администратора' });
};
