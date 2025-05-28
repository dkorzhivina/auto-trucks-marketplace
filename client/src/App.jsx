import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import TruckDetail from './pages/TruckDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stats from './pages/Stats';
import Home from './pages/Home';
import OrderForm from './pages/OrderForm';
import Support from './pages/Support';
import AdminTruckPanel from './components/AdminTruckPanel'; // ✅ уже есть

function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ paddingTop: '80px' }}>
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/trucks/:id" element={<TruckDetail />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/admin" element={<AdminTruckPanel />} /> {/* ✅ Добавлено */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
