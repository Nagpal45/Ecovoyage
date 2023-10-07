import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Signin from "../signIn/signIn";
import { AuthContext } from "../../context/authContext";


export default function Navbar({ newUser }) {
  const [activeOption, setActiveOption] = useState("");
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {

    const handleClickOutside = (event) => {
      setTimeout(() => {
        if (showDropdown && !event.target.classList.contains("dropdownItem")) {
          setShowDropdown(false);
        }
      }, 300);
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);


  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY  < 700) {
      setActiveOption("home");
    } else if (scrollY < 1600) {
      setActiveOption("discover");
    } else if (scrollY < 2300) {
      setActiveOption("testimonials");
    } else {
      setActiveOption("faqs");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOptionClick = (sectionId) => {
    if (sectionId === "home") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 1, behavior: "smooth" });
      }, 0);
    }
    if (sectionId === "discover") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 700, behavior: "smooth" });
      }, 0);
    }
    if (sectionId === "testimonials") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 1850, behavior: "smooth" });
      }, 0);
    }
    if (sectionId === "faqs") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 2550, behavior: "smooth" });
      }, 0);
    }
    if(sectionId === "travelPlan"){
      if(user || newUser){
        navigate("/plan");
      }
      else{
        openSignInModal();
      }
      setTimeout(() => {
        setActiveOption("travelPlan");
      },100)
    }
  };

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const closeSignInModal = () => {
    setIsSignInModalOpen(false);
    document.body.classList.remove("body-no-scroll");
  };

  const handeLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setShowDropdown(false);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  }

  const handleYourTripsClick = () => {
    navigate("/yourTrips");
  }

  const handleSignOutClick = () => {
    if(user){
      handeLogout();
    }
    else if(newUser){
      logout();
    }
  }


  return (
    <div className="navbarWrapper">
      <div className="left">
        <Link to="/">
          <div className="logo">
            <img src="/images/logo.png" alt="logo" className="logoimg" />
            <span className="boldlogo">Eco</span>
            <span className="logosimple">Voyage</span>
          </div>
        </Link>
      </div>
      <div className="center">
        <ul className="centerList">
          <li
            className={activeOption === "home" ? "active listItem" : "listItem"}
            onClick={() => handleOptionClick("home")}
          >
            Home
          </li>

          <li
            className={
              activeOption === "discover" ? "active listItem" : "listItem"
            }
            onClick={() => handleOptionClick("discover")}
          >
            Discover
          </li>
          <li
            className={activeOption === "travelPlan" ? "active listItem" : "listItem"}
            onClick={() => handleOptionClick("travelPlan")}
          >
            Plan Travel
          </li>
          <li
            className={
              activeOption === "testimonials" ? "active listItem" : "listItem"
            }
            onClick={() => handleOptionClick("testimonials")}
          >
            Reviews
          </li>
          <li
            className={activeOption === "faqs" ? "active listItem" : "listItem"}
            onClick={() => handleOptionClick("faqs")}
          >
            FAQs
          </li>
        </ul>
      </div>
      <div className="right">
        {newUser ? (
          <div className={showDropdown ? "profileIcon activeIcon" : "profileIcon"} onClick={handleDropdown}>
            
            <img
              src={
                newUser.picture
                  ? newUser.picture
                  : "/images/dummyProfilePic.png"
              }
              alt=""
              className="profileImg"
            />
            <span className="profileName">{newUser.username.split(' ')[0]}</span>
          </div>
        ) : user ? (
          <div className="profileIcon" onClick={handleDropdown}>
            <img
              src={user.picture ? user.picture : "/images/dummyProfilePic.png"}
              alt=""
              className="profileImg"
            />
            <span className="profileName">{user.username.split(' ')[0]}</span>
          </div>
        ) : (
          <button className="signin" onClick={openSignInModal}>
            Sign in
          </button>
        )}
      </div>
      {isSignInModalOpen && <Signin onClose={closeSignInModal} />}
      {showDropdown && (
        <div className="dropdownMenu">
            <div onClick={handleProfileClick} className="dropdownItem">
              <img src="/images/edit2.png" alt="" className="profileEditIcon" />
              <span>Edit Profile</span>
            </div>
            <div onClick={handleYourTripsClick} className="dropdownItem">

              <img src="/images/travel.png" alt="" className="tripsIcon" />
              <span>Your Trips</span>
            </div>
            <div onClick={handleSignOutClick} className="dropdownItem">
              <img src="/images/logout.png" alt="" className="signoutIcon" />
              <span>Sign Out</span>
            </div>
        </div>
      )}
    </div>
  );
}
