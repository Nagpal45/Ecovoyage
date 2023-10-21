import React, {useState } from "react";
import "./signIn.css";
import { Close, MailOutline } from "@material-ui/icons";
import axios from "axios";
import SignupForm from "./signupForm";
import SigninForm from "./signinForm";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";



export default function Signin({ onClose }) {
  const { dispatch } = useContext(AuthContext);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const[signupFailed, setSignupFailed] = useState(false);
  const[signupSuccess, setSignupSuccess] = useState(false);

  const signInWithGoogle = async () => {
    try {      
      window.open(
        "http://localhost:5000/auth/google",
        "_self");
     
    } catch (error) {
      console.error(error);
    }
  }

  const signInWithEmail = () => {
    setShowEmailForm(true);
    setSignupFailed(false);
  };

  const signUpWithEmail = () => {
    setShowRegistrationForm(true);
    setLoginFailed(false);
    setWrongPassword(false);
    setSignupSuccess(false);
  };

  const goBack = () => {
    setShowRegistrationForm(false);
    setSignupFailed(false);
  }

  const SignIngoBack = () => {
    setShowEmailForm(false);
    setLoginFailed(false);
    setWrongPassword(false);
    setSignupSuccess(false);
  };

  const handlesigninFormSubmit = async (e) => {
    e.preventDefault();
  const email = e.target.signinemail.value;
  const password = e.target.signinpassword.value;

  try {
    setLoginFailed(false);
    setWrongPassword(false);
    setSignupSuccess(false);
    const response = await axios.post("/auth/login", {
      email, 
      password,
    });
    const token = response.data.token;
    const user = response.data.user;

    dispatch({ type: "LOGIN_SUCCESS", payload: {user, token} });


    onClose(); 
  } catch (error) {
    console.error(error);

    if(error.response.status === 400) {
      setLoginFailed(true);
    }

    else if(error.response.status === 403) {
      setWrongPassword(true);
    }


    dispatch({ type: "LOGIN_FAILURE", payload: error });
    
  }
  };

  const handlesignupFormSubmit = async (e) => {
    e.preventDefault();
  const name = e.target.signupname.value;
  const email = e.target.signupemail.value;
  const password = e.target.signuppassword.value;

  try {
    await axios.post("/auth/register", {
      username: name, 
      email,
      password,
    });

    setSignupSuccess(true);
    goBack();
  } catch (error) {
    console.error(error);

    if(error.response.status === 400) {
      setSignupFailed(true);
    }
  }
  };

  return (
    <div className="signinWrapper">
      {showRegistrationForm ? (
          <SignupForm goBack={goBack} onClose={onClose} handlesignupFormSubmit={handlesignupFormSubmit} 
          signupFailed={signupFailed}
          />
        ):
        showEmailForm ? (
            <SigninForm 
            onClose={onClose}
            SignIngoBack={SignIngoBack}
            handlesigninFormSubmit={handlesigninFormSubmit}
            signUpWithEmail={signUpWithEmail}
            loginFailed={loginFailed}
            wrongPassword={wrongPassword}
            signupSuccess={signupSuccess}
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
