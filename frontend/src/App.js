import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Header from './components/Header';
import HeadersSW from './components/HeadersSW';
import Login from './components/Login';
import Children from './components/Children';
import Account from './components/Account';
import Role from './components/Role';
import DatePick from './components/Date';
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';
import Order from './components/Order';
import Menu from './components/Menu';
import SetDishes from './components/SetDishes';
import Save from './components/Save';
import DishList from './components/DishList';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const role = localStorage.getItem('role'); // Get the user's role from localStorage
  const showHeader = location.pathname !== '/' && location.pathname !== '/role';
  const showHeaderSW = role === 'schoolworker';

  return (
    <div className="app">
      {showHeader && (showHeaderSW ? <HeadersSW /> : <Header />)}
      <Routes>
        <Route exact path="/save" element={<Save />} />
        <Route exact path="/main" element={<Mainpage />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/children" element={<Children />} />
        <Route exact path="/role" element={<Role />} />
        <Route exact path="/date" element={<DatePick />} />
        <Route exact path="/breakfast" element={<Breakfast />} />
        <Route exact path="/lunch" element={<Lunch />} />
        <Route exact path="/dinner" element={<Dinner />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/menu" element={<Menu />} />
        <Route exact path="/dishlist" element={<DishList />} />
        <Route exact path="/dishes" element={<SetDishes />} />
      </Routes>
    </div>
  );
}

export default App;
