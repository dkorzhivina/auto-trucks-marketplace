import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Catalog = () => {
  const [trucks, setTrucks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [role, setRole] = useState(''); // ✅ добавили useState для роли

  useEffect(() => {
    axios.get('http://localhost:5000/api/trucks')
      .then(res => {
        setTrucks(res.data);
        setFiltered(res.data);
        const uniqueBrands = [...new Set(res.data.map(t => t.brand))];
        setBrands(uniqueBrands);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setRole(localStorage.getItem('role') || ''); // ✅ загрузка роли из localStorage
  }, []);

  const applyFilters = () => {
    let result = trucks;

    if (selectedBrand) {
      result = result.filter(t => t.brand === selectedBrand);
    }

    if (priceMin) {
      result = result.filter(t => t.price >= parseInt(priceMin));
    }

    if (priceMax) {
      result = result.filter(t => t.price <= parseInt(priceMax));
    }

    setFiltered(result);
  };

  const resetFilters = () => {
    setSelectedBrand('');
    setPriceMin('');
    setPriceMax('');
    setFiltered(trucks);
  };

  const handleOpenForm = () => {
    alert('Открытие формы добавления грузовика (добавь модалку или маршрут)');
  };

  return (
    <div className="container">
      <h1 className="hero-title">Каталог грузовиков</h1>

      {/* ✅ Кнопка только для admin */}
      {role === 'admin' && (
        <button onClick={handleOpenForm} className="button" style={{ marginBottom: '1rem' }}>
          ➕ Добавить грузовик
        </button>
      )}

      <div className="filter-box">
        <div className="filter-group">
          <label>Бренд:</label>
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            <option value="">Все бренды</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Цена от:</label>
          <input
            type="number"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
            placeholder="Минимум"
          />
        </div>

        <div className="filter-group">
          <label>Цена до:</label>
          <input
            type="number"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
            placeholder="Максимум"
          />
        </div>

        <div className="filter-actions">
          <button className="button" onClick={applyFilters}>Применить</button>
          <button className="button secondary" onClick={resetFilters}>Сбросить</button>
        </div>
      </div>

      <div className="card-grid">
        {filtered.map(truck => (
          <Link key={truck.id} to={`/trucks/${truck.id}`} className="card-link">
            <div className="card">
              <img src={truck.image_url} alt={truck.title} className="card-image" />
              <h3>{truck.title}</h3>
              <p className="text-muted">{truck.brand}</p>
              <p className="text-price">{truck.price.toLocaleString()} ₽</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
