import React, { useContext, useEffect } from 'react';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Footer from './components/footer/footer';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Plan from './pages/travelPlan/plan';
import { AuthContext } from './context/authContext';

function App() {
  const [newUser, setnewUser] = React.useState(null);
  const {user} = useContext(AuthContext)


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
            setnewUser(resObject.user);
          })
      };
      getUser();
    }, []);

  return (
    <div className="App">
      <Router>
      <Navbar newUser={newUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={user || newUser ? <Plan /> : <Home />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      <Footer/>
      </Router> 
    </div>
  );
}

export default App;
