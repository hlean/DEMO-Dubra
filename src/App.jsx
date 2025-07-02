import './styles.css'
import './tailwind.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import DashboardPage from './components/pages/DashboardPage'
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboardPage from './components/pages/AdminDashboardPage';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AdminMapPage from './components/pages/AdminMapPage';
import Dashboard from './components/dashboard/Dashboard';
import PlaceOrderPage from './components/pages/PlaceOrderPage';
import ProfilePage from './components/pages/ProfilePage';
import NewOrderPage from './components/pages/NewOrderPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registrarse" element={<RegisterPage />} />

        {/* Rutas del usuario, con DashboardPage como componente padre */}
        <Route path="/user" element={<DashboardPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="placeOrder" element={<PlaceOrderPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="newOrder" element={<NewOrderPage />} />
        </Route>

        {/* Rutas del administrador */}
        <Route path="/admin" element={<AdminDashboardPage />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orderManager" element={<PlaceOrderPage />} />
          <Route path="map" element={<AdminMapPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
