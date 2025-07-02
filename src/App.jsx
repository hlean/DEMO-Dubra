import './styles.css'
import './tailwind.css'
import { Routes, Route, useLocation } from 'react-router-dom';
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
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './components/pages/ProfilePage';
import NewOrderPage from './components/pages/NewOrderPage';

function App() {
  const location = useLocation(); 
  const hideFooterPrefixes = ["/user", "/admin"];
  const showFooter = !hideFooterPrefixes.some(prefix => location.pathname.startsWith(prefix));

  return (
    <>
      <AuthProvider>
        <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrarse" element={<RegisterPage />} />
            <Route path="/user"
              element={<ProtectedRoute>
              <DashboardPage />
              </ProtectedRoute>}>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='placeOrder' element={<PlaceOrderPage/>}/>
                <Route path='profile' element={<ProfilePage/>}/>
                <Route path='newOrder' element={<NewOrderPage/>}/>
              </Route>
            <Route path='/admin'
              element={<ProtectedRoute>
              <AdminDashboardPage/>
              </ProtectedRoute>}>
                <Route path='dashboard' element={<AdminDashboard/>}/>
                <Route path='map' element={<AdminMapPage/>}/>
            </Route>
          </Routes>
        {showFooter && <Footer />}
      </AuthProvider>
    </>
  )
}

export default App
