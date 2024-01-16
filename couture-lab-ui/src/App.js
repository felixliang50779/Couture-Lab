import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from './Context/authcontext.js';

import Home from './Pages/Home.js';
import Dashboard from './Pages/Dashboard.js';
import Closet from './Pages/Closet.js';
import AddClothes from './Pages/AddClothes.js';
import Calendar from './Pages/Calendar.js';
import Recommend from './Pages/Recommend.js';
import SignIn from './Pages/SignIn.js';
import SignUp from './Pages/SignUp.js';
import About from './Pages/About.js';
import Contact from './Pages/Contact.js'

import ProtectedRoute from './Utilities/ProtectedRoute.js';


import './App.css';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/SignIn' element={<SignIn />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/Dashboard' element={<ProtectedRoute>  <Dashboard />  </ProtectedRoute>} />
            <Route path='/Closet' element={<Closet />} />
            <Route path='/AddClothes' element={<AddClothes />} />
            <Route path='/Calendar' element={<Calendar />} />
            <Route path='/Recommend' element={<Recommend />} />
            <Route path='/About' element={<About />} />
            <Route path='/Contact' element={<Contact />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
