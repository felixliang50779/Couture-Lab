import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

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
import VerifyEmail from './Pages/VerifyEmail.js';

import { AuthProvider } from './Utilities/authcontext';
import PrivateRoute from './Utilities/PrivateRoute.js';

import './App.css';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/closet' element={<Closet />} />
            <Route path='/addclothes' element={<AddClothes />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/verifyemail' element={<VerifyEmail />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
