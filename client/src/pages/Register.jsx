import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;
    axios.get('http://localhost:5000/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setUser(res.data);
      setForm({ name: res.data.name || '', phone: res.data.phone || '' });
    });

    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data));
  }, [token]);

  const handleSave = () => {
    axios.put('http://localhost:5000/api/profile', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUser(res.data);
      setEditMode(false);
    })
    .catch(() => alert('Ошибка при обновлении'));
  };

  if (!user) return <p className="p-4 text-center">Загрузка...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Профиль пользователя</h2>

      {editMode ? (
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Имя"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Телефон"
            className="w-full p-2 border rounded"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Сохранить
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Имя:</strong> {user.name || '—'}</p>
          <p><strong>Телефон:</strong> {user.phone || '—'}</p>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Создан:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Редактировать
          </button>
        </div>
      )}

      <hr className="my-4" />

      <h3 className="text-lg font-semibold mb-2">История заказов</h3>
      {orders.length === 0 ? (
        <p>У вас пока нет заказов.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map(order => (
            <li
              key={order.id}
              className="p-3 border rounded bg-gray-50"
            >
              <p><strong>Модель:</strong> {order.Truck?.title}</p>
              <p><strong>Телефон:</strong> {order.phone}</p>
              <p><strong>Комментарий:</strong> {order.comment || '—'}</p>
              <p className="text-sm text-gray-500">
                Дата: {new Date(order.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
