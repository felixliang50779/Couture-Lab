import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Closet from './Pages/Closet';
import AddClothes from './Pages/AddClothes';
import Calendar from './Pages/Calendar';
import Recommend from './Pages/Recommend';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import Contact from './Pages/Contact'
import VerifyEmail from './Pages/VerifyEmail';

import BasicInfo from './Form/BasicInfo';

import { AuthProvider } from './Utilities/authcontext';
import PrivateRoute from './Utilities/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/closet' element={<Closet />} />
            <Route path='/addclothes' element={<AddClothes />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/verifyemail' element={<PrivateRoute><VerifyEmail /></PrivateRoute>} />
            <Route path='/basicinfo' element={<BasicInfo />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;