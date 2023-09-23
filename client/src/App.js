import React from 'react';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
