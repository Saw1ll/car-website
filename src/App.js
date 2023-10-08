import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './JSX/components/jsx/Navbar.jsx';
import Home from './JSX/pages/Home.jsx';
import Products from './JSX/pages/Products.jsx';
import SignUp from './JSX/pages/SignUp.jsx';
import Services from './JSX/pages/Services.jsx';
import Login from './JSX/pages/Login.jsx';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/log-in' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
