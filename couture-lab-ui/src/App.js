import { BrowserRouter as Router, Routes, Route, Navigate }
    from 'react-router-dom';

import Home from './Pages/Home.js';
import Dashboard from './Pages/Dashboard.js';
import Closet from './Pages/Closet.js';
import AddClothes from './Pages/AddClothes.js';
import Calendar from './Pages/Calendar.js';
import Recommendation from './Pages/Recommendation.js';
import SignIn from './Pages/SignIn.js';
import SignUp from './Pages/SignUp.js';

import { ChakraProvider } from '@chakra-ui/react';

import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate replace to='/Home' />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Closet' element={<Closet />} />
          <Route path='/AddClothes' element={<AddClothes />} />
          <Route path='/Calendar' element={<Calendar />} />
          <Route path='/Recommendation' element={<Recommendation />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
