import React from 'react';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Footer from './components/footer/footer';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Plan from './pages/travelPlan/plan';



function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>

      </Router> 
      <Footer/>
    </div>
  );
}

export default App;
