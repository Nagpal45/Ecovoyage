import React, { useState } from "react";
import "./signIn.css";
import { ArrowBack, Close, MailOutline } from "@material-ui/icons";

export default function Signin({ onClose }) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const signInWithGoogle = async () => {
    try {
      const width = 500;
      const height = 500;
      const left = window.innerWidth / 2 - width / 2 + window.screenX;
      const top = window.innerHeight / 2 - height / 2 + window.screenY;

      const windowFeatures = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;
      window.open(
        "http://localhost:5000/auth/google",
        "_blank",
        windowFeatures
      );
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithEmail = () => {
    setShowEmailForm(true);
  };

  const goBack = () => {
    setShowEmailForm(false);
  };

  const handleEmailFormSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="signinWrapper">
      {showEmailForm ? (
        <>
          <div className="emailFormWrapper">
            <ArrowBack className="buttonBack" onClick={goBack} />
            <div className="emailHeader">
              <img className="signinLogo" src="/images/logo.png" alt="" />
              <h2>Welcome back.</h2>
            </div>
            <form className="emailForm" onSubmit={handleEmailFormSubmit}>
              <label htmlFor="email">Email address</label>
              <input type="email" placeholder="abc@gmail.com" required />
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="must have atleast 6 characters" required />
              <button type="submit">Sign in</button>
            </form>
            <div className="emailFooter">
              <div class="line-container">
                <div class="gray-line"></div>
                <div class="centered-text">Not a member?</div>
                <div class="gray-line"></div>
              </div>
              <div className="joinUs">
                <span><a href="#">Join</a> us to unlock the best of EcoVoyage</span>
              </div>
            </div>
            <Close className="buttonClose" onClick={onClose} />
          </div>
        </>
      ) : (
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
