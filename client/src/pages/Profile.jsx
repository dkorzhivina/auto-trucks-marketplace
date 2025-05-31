import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', city: '', company: '' });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    axios
      .get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({
          name: res.data.name || '',
          phone: res.data.phone || '',
          city: res.data.city || '',
          company: res.data.company || '',
        });
        setLoading(false);
      })
      .catch(() => {
        alert('Ошибка при получении профиля');
        localStorage.removeItem('token');
        navigate('/');
      });

    axios
      .get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch(() => alert('Ошибка при получении заказов'));
  }, [token, navigate]);

  const handleSave = () => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCancel = (id) => {
    axios
      .post(`http://localhost:5000/api/orders/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id
              ? { ...order, comment: `[ОТМЕНЁН] ${order.comment}` }
              : order
          )
        );
      });
  };

  const handleRepeat = (id) => {
    axios
      .post(`http://localhost:5000/api/orders/repeat/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders((prev) => [res.data, ...prev]);
      });
  };

  if (loading) return <p className="p-4 text-center">Загрузка...</p>;

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="profile-info">
          {editMode ? (
            <div className="edit-form">
              <div className="form-group">
                <label>Имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Телефон</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Город</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Компания</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>
              <div className="profile-actions">
                <button className="edit-btn" onClick={handleSave}>Сохранить</button>
                <button className="logout" onClick={() => setEditMode(false)}>Отмена</button>
              </div>
            </div>
          ) : (
            <>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Имя:</strong> {user.name || '—'}</p>
              <p><strong>Телефон:</strong> {user.phone || '—'}</p>
              <p><strong>Город:</strong> {user.city || '—'}</p>
              <p><strong>Компания:</strong> {user.company || '—'}</p>
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>Создан:</strong> {new Date(user.createdAt).toLocaleString()}</p>
              <div className="profile-actions">
                <button className="edit-btn" onClick={() => setEditMode(true)}>Редактировать</button>
                <button className="logout" onClick={handleLogout}>Выйти</button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="orders-list">
        <h3>История заказов</h3>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p><strong>Модель:</strong> {order.Truck?.title || '—'}</p>
                <p><strong>Телефон:</strong> {order.phone}</p>
                <p><strong>Комментарий:</strong> {order.comment || '—'}</p>
                <p className="text-sm text-gray-500">
                  Оформлен: {new Date(order.createdAt).toLocaleString()}
                </p>
                <button onClick={() => handleRepeat(order.id)}>Повторить</button>
                <button onClick={() => handleCancel(order.id)}>Отменить</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;
