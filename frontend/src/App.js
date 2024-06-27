import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Header from './components/Header';
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

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const showHeader = location.pathname !== '/login' && location.pathname !== '/role';

  return (
    <div className="app">
     {showHeader && <Header />} 
      <Routes>
        <Route exact path="/main" element={<Mainpage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/children" element={<Children />} />
        <Route exact path="/role" element={<Role />} />
        <Route exact path="/date" element={<DatePick />} />
        <Route exact path="/breakfast" element={<Breakfast />} />
        <Route exact path="/lunch" element={<Lunch />} />
        <Route exact path="/dinner" element={<Dinner />} />
        <Route exact path="/order" element={<Order />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/menu" element={<Menu />} />
      </Routes>
    </div>
  );
}

export default App;