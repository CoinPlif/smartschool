import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Login from './components/Login';
import Children from './components/Children';
import Role from './components/Role';
import DatePick from './components/Date';
import Breakfast from './components/Breakfast';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/main" element={<Mainpage/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/children" element={<Children/>} />
        <Route exact path="/role" element={<Role/>} />
        <Route exact path="/date" element={<DatePick/>} />
        <Route exact path="/breakfast" element={<Breakfast/>} />
        <Route exact path="/lunch" element={<Lunch/>} />
        <Route exact path="/dinner" element={<Dinner/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
