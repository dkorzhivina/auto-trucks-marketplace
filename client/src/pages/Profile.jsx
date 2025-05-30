import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    // Загрузка профиля
    axios
      .get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({ name: res.data.name || '', phone: res.data.phone || '' });
        setLoading(false);
      })
      .catch(() => {
        alert('Ошибка при получении профиля. Войдите снова.');
        localStorage.removeItem('token');
        navigate('/');
      });

    // Загрузка заказов
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
      <h2>Профиль пользователя</h2>

      {editMode ? (
        <>
          <input
            type="text"
            placeholder="Имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <button className="edit-btn" onClick={handleSave}>
            Сохранить
          </button>
        </>
      ) : (
        <>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Имя:</strong> {user.name || '—'}</p>
          <p><strong>Телефон:</strong> {user.phone || '—'}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Создан:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            Редактировать
          </button>
        </>
      )}

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

      <button className="logout" onClick={handleLogout}>
        Выйти
      </button>
    </motion.div>
  );
};

export default Profile;
