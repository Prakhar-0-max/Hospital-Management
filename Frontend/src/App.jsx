import React, { useContext, useEffect } from 'react'
import "./App.css";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Aboutus from './pages/Aboutus';
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar';
import { Context } from './main';
import Footer from './components/Footer';

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);

  return (
    <>
    <Router>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
      <Footer/>
      <ToastContainer position='top-center'/>
    </Router>
    </>
  )
}

export default App