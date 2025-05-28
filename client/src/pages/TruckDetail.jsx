import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TruckDetail = () => {
  const { id } = useParams();
  const [truck, setTruck] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/trucks/${id}`)
      .then(res => setTruck(res.data))
      .catch(err => console.error('Ошибка при загрузке:', err));
  }, [id]);

  if (!truck) return <div className="container">Загрузка...</div>;

  return (
    <div className="container">
      <div className="truck-detail">
        <img src={truck.image_url} alt={truck.title} className="truck-image" />
        <div className="truck-info">
          <h2>{truck.title}</h2>
          <p className="text-muted">{truck.description}</p>

          <ul className="truck-params">
            <li><strong>Марка:</strong> {truck.brand}</li>
            <li><strong>Год выпуска:</strong> {truck.year}</li>
            <li><strong>Мощность:</strong> {truck.enginePower} л.с.</li>
            <li><strong>Коробка:</strong> {truck.transmission}</li>
            <li><strong>Состояние:</strong> {truck.condition}</li>
            <li><strong>Пробег:</strong> {truck.mileage?.toLocaleString()} км</li>
            <li><strong>Грузоподъёмность:</strong> {truck.payload_capacity} кг</li>
          </ul>

          <p className="text-price">{truck.price.toLocaleString()} ₽</p>
        </div>
      </div>

      {/* Удалена форма оформления заказа */}
      {/* 
      <form className="order-form" onSubmit={handleOrder}>
        <h3>Оформить заказ</h3>
        <input
          type="text"
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <textarea
          placeholder="Комментарий"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="button" type="submit">Заказать</button>
        {success && <p className="success">{success}</p>}
      </form>
      */}
    </div>
  );
};

export default TruckDetail;
