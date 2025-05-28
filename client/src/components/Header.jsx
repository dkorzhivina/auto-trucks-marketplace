import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthModal from './AuthModal';

const Header = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const roleFromStorage = localStorage.getItem('role');
    setIsAuth(!!token);
    setRole(roleFromStorage || '');

    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      const updatedRole = localStorage.getItem('role');
      setIsAuth(!!updatedToken);
      setRole(updatedRole || '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isAuthModalOpen]);

  const handleProfileClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-10 px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Auto Trucks</h1>
      <nav>
        <Link to="/" className="mr-4 text-blue-600 hover:underline">Главная</Link>
        <Link to="/catalog" className="mr-4 text-blue-600 hover:underline">Каталог</Link>

        {role === 'admin' && (
          <Link to="/admin" className="mr-4 text-blue-600 hover:underline">Панель админа</Link>
        )}

        {isAuth ? (
          <Link to="/profile" className="mr-4 text-blue-600 hover:underline">Профиль</Link>
        ) : (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleProfileClick();
            }}
            className="mr-4 text-blue-600 hover:underline cursor-pointer"
          >
            Профиль
          </a>
        )}
      </nav>

      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </header>
  );
};

export default Header;
