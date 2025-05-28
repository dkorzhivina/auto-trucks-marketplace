import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>🚛 Auto Trucks</h1>
          <p>Надёжные грузовики для бизнеса и жизни</p>
          <div className="hero-buttons">
            <Link to="/support" className="btn dark">Связаться с поддержкой</Link>
            <Link to="/order" className="btn blue">Оформить заказ</Link>
          </div>
        </div>
        <img src="/images/truck1.jpg" alt="Грузовик" />
      </section>

      <section className="features">
        <div className="card">
          <h3>Проверенная техника</h3>
          <p>Каждый грузовик проходит полную диагностику и проверку.</p>
        </div>
        <div className="card">
          <h3>Подбор клиентов</h3>
          <p>Находим подходящих покупателей под каждый автомобиль.</p>
        </div>
        <div className="card">
          <h3>Оформление за 2 минуты</h3>
          <p>Простая и быстрая форма оформления заказа онлайн.</p>
        </div>
      </section>

      <section className="about">
        <h2>О нас</h2>
        <p>
          Auto Trucks — это надёжная онлайн-площадка по продаже новых и подержанных грузовиков. Мы работаем по всей России и предоставляем только проверенную технику от ведущих производителей.
        </p>
      </section>

      <section className="news">
        <h2>Последние новости</h2>
        <ul>
          <li>📢 Мы открыли новое отделение в Санкт-Петербурге</li>
          <li>🚚 Поступление новых моделей MAN и Volvo</li>
          <li>🎉 Скидки до 15% на технику с пробегом до 50 тыс. км</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
