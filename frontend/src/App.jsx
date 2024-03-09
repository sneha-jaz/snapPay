import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import SendMoney from './pages/SendMoney';

function App() {
  return (
    <div> 
      <BrowserRouter>
        <Routes>
          <Route path='signup' element={<Signup/>}></Route> 
          <Route path='signin' element={<Signin/>}></Route> 
          <Route path='dashboard' element={<Dashboard/>}></Route> 
          <Route path='sendmoney' element={<SendMoney/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
