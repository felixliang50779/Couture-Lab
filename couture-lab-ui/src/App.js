import { BrowserRouter as Router, Routes, Route, Navigate }
    from 'react-router-dom';

import Home from './Pages/Home.js';
import Dashboard from './Pages/Dashboard.js';
import Closet from './Pages/Closet.js';
import History from './Pages/History.js';
import Recommendation from './Pages/Recommendation.js';

import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to='/Home' />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Closet' element={<Closet />} />
          <Route path='/History' element={<History />} />
          <Route path='/Recommendation' element={<Recommendation />} />
        </Routes>
      </Router>
  );
}

export default App;
