import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './AuthModal.css';

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (isLogin) {
        res = await axios.post('http://localhost:5000/api/auth/login', {
          email: form.email,
          password: form.password,
        });
      } else {
        res = await axios.post('http://localhost:5000/api/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
        });
      }

      localStorage.setItem('token', res.data.token);

      const decoded = jwtDecode(res.data.token);
      localStorage.setItem('role', decoded.role);


      onClose();
      navigate('/profile');
    } catch (err) {
      console.error('Ошибка при авторизации:', err);
      alert('Неверные данные');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <div className="auth-modal-header">
          <img
            src="/path-to-your-avatar.png" 
            alt="User avatar"
            className="auth-avatar"
          />
          <div className="auth-tabs">
            <button
              className={`tab-button ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Вход
            </button>
            <button
              className={`tab-button ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Регистрация
            </button>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Имя пользователя"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required={!isLogin}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              👁️
            </button>
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <button
          className="switch-auth-mode"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Нужна регистрация?' : 'Уже есть аккаунт?'}
        </button>

        {isLogin && (
          <div className="forgot-password-link">
            <a href="/forgot-password" style={{ color: '#b46a26' }}>Забыли пароль?</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
