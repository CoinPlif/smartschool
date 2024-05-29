import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/main" element={<Mainpage/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
