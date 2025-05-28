import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTruckPanel = () => {
  const [trucks, setTrucks] = useState([]);
  const [form, setForm] = useState({ title: '', brand: '', price: '', imageUrl: '' });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  // Получить все грузовики
  const fetchTrucks = async () => {
    const res = await axios.get('http://localhost:5000/api/trucks');
    setTrucks(res.data);
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  // Обработка формы
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/trucks/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/trucks', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setForm({ title: '', brand: '', price: '', imageUrl: '' });
      setEditingId(null);
      fetchTrucks();
    } catch (err) {
      alert('Ошибка при сохранении: ' + err.response?.data?.message);
    }
  };

  const handleEdit = truck => {
    setForm(truck);
    setEditingId(truck.id);
  };

  const handleDelete = async id => {
    if (window.confirm('Удалить грузовик?')) {
      await axios.delete(`http://localhost:5000/api/trucks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTrucks();
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Админ-панель грузовиков</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="title" placeholder="Модель" value={form.title} onChange={handleChange} required />
        <input name="brand" placeholder="Бренд" value={form.brand} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Цена" value={form.price} onChange={handleChange} required />
        <input name="imageUrl" placeholder="Ссылка на изображение" value={form.imageUrl} onChange={handleChange} />

        <button type="submit">
          {editingId ? 'Обновить' : 'Добавить'}
        </button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Модель</th>
            <th>Бренд</th>
            <th>Цена</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map(truck => (
            <tr key={truck.id}>
              <td>{truck.title}</td>
              <td>{truck.brand}</td>
              <td>{truck.price}</td>
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
