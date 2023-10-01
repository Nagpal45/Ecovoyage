import React, { useState } from "react";
import "./signIn.css";
import { Close, MailOutline } from "@material-ui/icons";
import axios from "axios";
import SignupForm from "./signupForm";
import SigninForm from "./signinForm";

export default function Signin({ onClose }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const signInWithGoogle = async () => {
    try {
      
      window.open(
        "http://localhost:5000/auth/google",
        "_self",
        
      );
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithEmail = () => {
    setShowEmailForm(true);
  };

  const signUpWithEmail = () => {
    setShowRegistrationForm(true);
  };

  const goBack = () => {
    setShowRegistrationForm(false);
  }

  const SignIngoBack = () => {
    setShowEmailForm(false);
  };

  const handlesigninFormSubmit = async (e) => {
    e.preventDefault();
  const email = e.target.signinemail.value;
  const password = e.target.signinpassword.value;

  try {
    const response = await axios.post("/auth/login", {
      email, 
      password,
    });
    const token = response.data.token;
    
    // Save the token to localStorage or a secure storage method.
    // You can use localStorage.setItem("token", token);

    onClose(); 
  } catch (error) {
    console.error(error);
    
  }
  };

  const handlesignupFormSubmit = async (e) => {
    e.preventDefault();
  const name = e.target.signupname.value;
  const email = e.target.signupemail.value;
  const password = e.target.signuppassword.value;

  try {
    const response = await axios.post("/auth/register", {
      username: name, 
      email,
      password,
    });
    const token = response.data.token;

    // Save the token to localStorage or a secure storage method.
    // You can use localStorage.setItem("token", token);

    onClose(); 
  } catch (error) {
    console.error(error);
  }
  };

  return (
    <div className="signinWrapper">
      {showRegistrationForm ? (
          <SignupForm goBack={goBack} onClose={onClose} handlesignupFormSubmit={handlesignupFormSubmit} />
        ):
        showEmailForm ? (
            <SigninForm 
            onClose={onClose}
            SignIngoBack={SignIngoBack}
            handlesigninFormSubmit={handlesigninFormSubmit}
            signUpWithEmail={signUpWithEmail}
            />
      )  : (
        <>
          <div className="signinPage">
            <div className="signinHeader">
              <img className="signinLogo" src="/images/logo.png" alt="" />
              <h2>Sign in to unlock the best of EcoVoyage.</h2>
            </div>
            <div className="signinButtons">
              <button className="buttonGoogle" onClick={signInWithGoogle}>
                <img src="/images/google.png" alt="" className="buttonLogo" />
                <span className="buttonEmailText">Continue with Google</span>
              </button>
              <button className="buttonEmail" onClick={signInWithEmail}>
                <MailOutline className="buttonLogo" />
                <span className="buttonEmailText">Continue with email</span>
              </button>
            </div>
            <div className="signinFooter">
              By proceeding, you agree to our <b>Terms of Use</b> and confirm
              you have read our <b>Privacy Policy</b>.
            </div>
            <Close className="buttonClose" onClick={onClose} />
          </div>
        </>
      )}
    </div>
  );
}
