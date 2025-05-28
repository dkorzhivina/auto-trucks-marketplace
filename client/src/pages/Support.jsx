import { useState } from 'react';

const Support = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Здравствуйте! Чем могу помочь?', fromBot: true },
  ]);
  const [input, setInput] = useState('');

  const quickReplies = [
    'Как оформить заказ?',
    'Проблемы с оплатой',
    'Гарантии и возврат',
    'Связаться с оператором',
  ];

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const newMessage = { id: Date.now(), text, fromBot: false };
    setMessages((msgs) => [...msgs, newMessage]);
    setInput('');

    // Имитация ответа бота с небольшой задержкой
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: Date.now() + 1,
          text: `Вы спросили: "${text}". Наш оператор свяжется с вами в ближайшее время.`,
          fromBot: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Связаться с нами</h1>

      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: 12,
          height: 400,
          overflowY: 'auto',
          marginBottom: 12,
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.map(({ id, text, fromBot }) => (
          <div
            key={id}
            style={{
              textAlign: fromBot ? 'left' : 'right',
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 16,
                backgroundColor: fromBot ? '#e1e1e1' : '#0a74da',
                color: fromBot ? '#000' : '#fff',
                maxWidth: '80%',
              }}
            >
              {text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        {quickReplies.map((text, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(text)}
            style={{
              marginRight: 8,
              marginBottom: 8,
              padding: '8px 12px',
              borderRadius: 12,
              border: 'none',
              backgroundColor: '#b46a26',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {text}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
      </form>
    </div>
  );
};

export default Support;
