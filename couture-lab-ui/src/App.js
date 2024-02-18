import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Closet from './Pages/Closet';
import Calendar from './Pages/Calendar';
import Recommend from './Pages/Recommend';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import About from './Pages/About';
import Contact from './Pages/Contact'
import VerifyEmail from './Pages/VerifyEmail';
import NotFound from './Pages/NotFound';
import BasicInfo from './Pages/BasicInfo';

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
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/closet' element={<PrivateRoute><Closet /></PrivateRoute>} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/verifyemail' element={<PrivateRoute><VerifyEmail /></PrivateRoute>} />
            <Route path='/basicinfo' element={<PrivateRoute><BasicInfo /></PrivateRoute>} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;