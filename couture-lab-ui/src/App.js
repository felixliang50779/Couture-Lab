import { BrowserRouter as Router, Routes, Route, Navigate }
    from 'react-router-dom';
import Home from './Home.js';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
