import { BrowserRouter as Router, Routes, Route, Navigate }
    from 'react-router-dom';
import Home from './Pages/Home.js';
import NavBar from './navbar.js';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/Home' />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
