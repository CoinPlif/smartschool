import logo from './images/logo.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Header from './components/Header';
import Login from './components/Login';
import Children from './components/Children';
import Role from './components/Role';
import DatePick from './components/Date';
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';
import Order from './components/Order';

function App() {
  return (
    <Router>
      <div className="app">
      <Header />
        <Routes>
          <Route exact path="/main" element={<Mainpage/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/children" element={<Children/>} />
          <Route exact path="/role" element={<Role/>} />
          <Route exact path="/date" element={<DatePick/>} />
          <Route exact path="/breakfast" element={<Breakfast/>} />
          <Route exact path="/lunch" element={<Lunch/>} />
          <Route exact path="/dinner" element={<Dinner/>} />
          <Route exact path="/order" element={<Order/>} />
        </Routes>
      </div>
  </Router>
  );
}

export default App;
