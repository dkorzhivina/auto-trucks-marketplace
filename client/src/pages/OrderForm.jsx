import { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [dealer, setDealer] = useState('');
  const [model, setModel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [agreePersonalData, setAgreePersonalData] = useState(false);
  const [agreeNewsletter, setAgreeNewsletter] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreePersonalData) {
      alert('Необходимо согласиться на обработку персональных данных');
      return;
    }

    const comment = `ФИО: ${lastName} ${firstName} ${middleName}, Email: ${email}, Дилер: ${dealer}, Модель (ID): ${model}`;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Пожалуйста, войдите в аккаунт для оформления заявки');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        truckId: parseInt(model), // ✅ передаём ID как число
        phone,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSubmitStatus('success');
        setDealer('');
        setModel('');
        setFirstName('');
        setLastName('');
        setMiddleName('');
        setPhone('');
        setEmail('');
        setAgreePersonalData(false);
        setAgreeNewsletter(false);
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', display: 'flex', gap: 40, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1, height: 400, borderRadius: 8, overflow: 'hidden' }}>
        <iframe
          title="Dealer Map"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A77be991cb7f7a43980f0eec6ecdf2f39a408b89db315dce95432619a49471559&amp;source=constructor"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ borderRadius: 8 }}
        />
      </div>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ color: '#003366' }}>Оформить заказ</h2>

        <select value={dealer} onChange={e => setDealer(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="" disabled>Выберите дилера</option>
          <option>ТЕХИНКОМ-Щелковское ш.</option>
          <option>Автоцентр на Каширском ш.</option>
          <option>Дилер на Ленинградском проспекте</option>
          <option>Дилер на Варшавском шоссе</option>
          <option>Автоцентр на МКАД</option>
          <option>Другой дилер</option>
        </select>

        <select value={model} onChange={e => setModel(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
          <option value="" disabled>Выберите модель</option>
          <option value="31">КамАЗ-54901</option>
          <option value="32">КамАЗ-5490 Neo</option>
          <option value="33">КамАЗ-65801</option>
          <option value="34">КамАЗ-65802</option>
          <option value="35">КамАЗ-65201</option>
          <option value="36">КамАЗ-65206</option>
          <option value="37">КамАЗ-65115</option>
          <option value="38">КамАЗ-65116</option>
          <option value="39">КамАЗ-53605</option>
          <option value="40">КамАЗ-43501 "Мустанг"</option>
          <option value="41">ГАЗон Next</option>
          <option value="42">ГАЗ-3309</option>
          <option value="43">ГАЗ-3310 "Валдай"</option>
          <option value="44">Урал Next</option>
          <option value="45">Урал-4320</option>
          <option value="46">МАЗ-6430</option>
          <option value="47">МАЗ-5440</option>
          <option value="48">МАЗ-5551</option>
        </select>

        <input type="text" placeholder="Имя" value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="text" placeholder="Фамилия" value={lastName} onChange={e => setLastName(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="text" placeholder="Отчество" value={middleName} onChange={e => setMiddleName(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="tel" placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />

        <label style={{ fontSize: 12, color: '#555' }}>
          <input type="checkbox" checked={agreePersonalData} onChange={e => setAgreePersonalData(e.target.checked)} required style={{ marginRight: 6 }} />
          Я даю согласие на <span style={{ color: '#b46a26' }}>Обработку персональных данных</span>
        </label>

        <label style={{ fontSize: 12, color: '#555' }}>
          <input type="checkbox" checked={agreeNewsletter} onChange={e => setAgreeNewsletter(e.target.checked)} style={{ marginRight: 6 }} />
          Соглашаюсь на <span style={{ color: '#b46a26' }}>Получение информационно-рекламной рассылки</span>
        </label>

        <p style={{ fontSize: 12, color: '#555', marginBottom: 20 }}>
          Если вы не согласны предоставить согласие на обработку персональных данных, то для оказания данной услуги можете обратиться непосредственно в дилерский центр
        </p>

        <button type="submit" style={{ backgroundColor: '#b46a26', color: 'white', padding: '12px 0', borderRadius: 8, border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          ОТПРАВИТЬ ЗАЯВКУ
        </button>

        {submitStatus === 'success' && (
          <p style={{ color: 'green', marginTop: 12 }}>Заявка успешно отправлена!</p>
        )}
        {submitStatus === 'error' && (
          <p style={{ color: 'red', marginTop: 12 }}>Ошибка при отправке заявки. Попробуйте позже.</p>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
