import { useEffect, useState } from 'react';
import axios from 'axios';

const Stats = () => {
  const [data, setData] = useState({
    totalValue: 0,
    buyers: 0,
    expensiveTruck: null,
    lowMileage: [],
    newTrucks: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [valueRes, buyersRes, expensiveRes, lowRes, newRes] = await Promise.all([
        axios.get('http://localhost:5000/api/stats/total-value'),
        axios.get('http://localhost:5000/api/stats/buyers-count'),
        axios.get('http://localhost:5000/api/stats/most-expensive'),
        axios.get('http://localhost:5000/api/stats/low-mileage'),
        axios.get('http://localhost:5000/api/stats/new')
      ]);

      setData({
        totalValue: valueRes.data.total,
        buyers: buyersRes.data.buyers,
        expensiveTruck: expensiveRes.data,
        lowMileage: lowRes.data,
        newTrucks: newRes.data
      });
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📊 Статистика</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Покупатели</h3>
          <p>{data.buyers} зарегистрированных пользователей</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Суммарная стоимость всех авто</h3>
          <p>{data.totalValue.toLocaleString()} ₽</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Самый дорогой автомобиль</h3>
          {data.expensiveTruck ? (
            <p>
              {data.expensiveTruck.title} — {data.expensiveTruck.price.toLocaleString()} ₽
            </p>
          ) : (
            <p>—</p>
          )}
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Авто с пробегом менее 30 000 км</h3>
          <p>{data.lowMileage.length} шт.</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Новые автомобили</h3>
          <p>{data.newTrucks.length} шт.</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
