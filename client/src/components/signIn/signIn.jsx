import React from "react";
import "./signIn.css";
import {Close, MailOutline} from "@material-ui/icons";

export default function Signin({ onClose }) {
  const signInWithGoogle = () => {};

  const signInWithEmail = () => {};

  return (
    <div className="signinWrapper">
      <div className="signinPage">
        <div className="signinHeader">
          <img className="signinLogo" src="/images/logo.png" alt="" />
          <h2>Sign in to unlock the best of EcoVoyage.</h2>
        </div>
        <div className="signinButtons">
          <button className="buttonGoogle" onClick={signInWithGoogle}>
          <img src="/images/google.png" alt="" className="buttonLogo"/>
            <span className="buttonEmailText">Continue with Google</span>
          </button>
          <button className="buttonEmail" onClick={signInWithEmail}>
            <MailOutline className="buttonLogo"/>
            <span className="buttonEmailText">Continue with email</span>
          </button>
        </div>
        <div className="signinFooter">
            By proceeding, you agree to our <b>Terms of Use</b> and confirm you have read our <b>Privacy Policy</b>.
        </div>
        <Close className="buttonClose" onClick={onClose} />
      </div>
    </div>
  );
}
