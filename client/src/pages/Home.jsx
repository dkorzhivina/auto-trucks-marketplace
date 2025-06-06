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
        <img
          src="https://avatars.mds.yandex.net/get-altay/9830718/2a000001919856f599316c9023ce3f61ddd7/XXL_height"
          alt="Грузовик"
        />
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
          <strong>Auto Trucks</strong> — это ведущая онлайн-платформа по продаже новых и подержанных грузовых автомобилей.
          Мы работаем по всей России и сотрудничаем с официальными дилерами, логистическими компаниями и крупными поставщиками техники.
        </p>
        <p>
          Мы предлагаем широкий выбор грузовиков от таких производителей, как <strong>KAMAZ</strong>, <strong>Volvo</strong>,
          <strong>MAN</strong>, <strong>Mercedes-Benz</strong>, <strong>Scania</strong> и других.
          Все транспортные средства проходят тщательную техническую проверку, а также сопровождаются полной историей обслуживания.
        </p>
        <p>
          Платформа предлагает простой интерфейс, мощные фильтры поиска, безопасное оформление заказа и квалифицированную поддержку 24/7.
          Наши клиенты — это частные покупатели, автопарки, перевозчики и строительные компании.
        </p>
        <p>
          Мы гордимся высоким уровнем доверия и постоянным развитием сервиса.
          Наша цель — сделать покупку грузовика максимально удобной, быстрой и безопасной для каждого клиента.
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
