import React, { useContext, useEffect } from 'react';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Footer from './components/footer/footer';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Plan from './pages/travelPlan/plan';
import { AuthContext } from './context/authContext';
import NotFound from './components/notFound/notFound';
import Profile from './pages/userProfile/profile';

function App() {
  const {user,dispatch} = useContext(AuthContext)


  useEffect(() => {
      const getUser = () => {
        fetch("http://localhost:5000/auth/login/success", {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
          .then((response) => {
            if (response.status === 200) return response.json();
            throw new Error("authentication has been failed!");
          })
          .then((resObject) => {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { user: resObject.user, token: resObject.cookies },
            });
          })
      };
      getUser();
    }, [ dispatch]);

  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={user ? <Plan /> : <Home />} />
          <Route path="/profile" element={user ? <Profile /> : <Home />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      <Footer/>
      </Router> 
    </div>
  );
}

export default App;
