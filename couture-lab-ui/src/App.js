import { BrowserRouter as Router, Routes, Route, Navigate }
    from 'react-router-dom';
import Home from './Pages/Home.js';
import Dashboard from './Pages/Dashboard.js';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate replace to='/Home' />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
