import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login'; 
import Stocks from './pages/Stocks';
import Tracking from './pages/tracking';
import Dashboard from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){

    return(

        <div className='container mt-5'>
            <Routes>
            <Route path="/" element={<Register />} />
            
            
            <Route path="/login" element={<Login />} />

            <Route path='/stocks' element={<Stocks />} />

            <Route path="/tracking" element={<Tracking />} />

            <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
      
        <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </div>


    );

}

export default App;