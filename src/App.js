import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/page/Home';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/services' />
          <Route path='/products' />
          <Route path='/sign-up' />
        </Routes>
      </Router>
    </>
  );
}

export default App;
