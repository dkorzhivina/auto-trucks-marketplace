import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTruckPanel = () => {
  const [trucks, setTrucks] = useState([]);
  const [form, setForm] = useState({ title: '', brand: '', price: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem('token');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchTrucks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/trucks', { headers });
      setTrucks(res.data);
    } catch {
      alert('Ошибка при загрузке грузовиков');
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/admin/trucks/${editingId}`, form, { headers });
      } else {
        await axios.post('http://localhost:5000/api/admin/trucks', form, { headers });
      }

      setForm({ title: '', brand: '', price: '', imageUrl: '' });
      setEditingId(null);
      fetchTrucks();
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении: ' + (err.response?.data?.message || ''));
    }
  };

  const handleEdit = (truck) => {
    setForm({
      title: truck.title,
      brand: truck.brand,
      price: truck.price,
      imageUrl: truck.imageUrl || '',
    });
    setEditingId(truck.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить грузовик?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/trucks/${id}`, { headers });
        fetchTrucks();
      } catch {
        alert('Ошибка при удалении');
      }
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h2>🛠 Админ-панель: Грузовики</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input name="title" placeholder="Модель" value={form.title} onChange={handleChange} required />
        <input name="brand" placeholder="Бренд" value={form.brand} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Цена" value={form.price} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Ссылка на изображение" value={form.imageUrl} onChange={handleChange} />

        {form.imageUrl && (
          <img src={form.imageUrl} alt="Превью" style={{ width: 200, border: '1px solid #ccc' }} />
        )}

        <button type="submit">
          {editingId ? 'Обновить' : 'Добавить'}
        </button>
      </form>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Модель</th>
            <th>Бренд</th>
            <th>Цена</th>
            <th>Картинка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map((truck) => (
            <tr key={truck.id}>
              <td>{truck.title}</td>
              <td>{truck.brand}</td>
              <td>{truck.price} ₽</td>
              <td>
                {truck.imageUrl ? (
                  <img src={truck.imageUrl} alt="truck" width="80" />
                ) : (
                  '—'
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(truck)}>✏️</button>
                <button onClick={() => handleDelete(truck.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTruckPanel;
