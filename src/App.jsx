import './styles.css'
import './tailwind.css'
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/pages/HomePage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AdminMapPage from './components/pages/AdminMapPage';
import Dashboard from './components/dashboard/Dashboard';
import PlaceOrderPage from './components/pages/PlaceOrderPage';
import ProfilePage from './components/pages/ProfilePage';
import NewOrderPage from './components/pages/NewOrderPage';

function App() {
  const location = useLocation(); 
  const hideFooterPrefixes = ["/user", "/admin"];
  const showFooter = !hideFooterPrefixes.some(prefix => location.pathname.startsWith(prefix));

  return (
    <>
        <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrarse" element={<RegisterPage />} />
            <Route path="/user">
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='placeOrder' element={<PlaceOrderPage/>}/>
              <Route path='profile' element={<ProfilePage/>}/>
              <Route path='newOrder' element={<NewOrderPage/>}/>
            </Route>
            <Route path='/admin'>
              <Route path='dashboard' element={<AdminDashboard/>}/>
              <Route path='map' element={<AdminMapPage/>}/>
            </Route>
          </Routes>
        {showFooter && <Footer />}
    </>
  )
}

export default App;
