import { ArrowBack, Close } from '@material-ui/icons'
import React from 'react'

export default function SignupForm({ onClose, goBack, handlesignupFormSubmit, signupFailed}) {
  return (
    <div className="emailFormWrapper">
            <ArrowBack className="buttonBack" onClick={goBack} />
            <div className="emailHeader">
              <img className="signinLogo" src="/images/logo.png" alt="" />
              <h2>Welcome back.</h2>
            </div>
            {signupFailed && (
              <div className="signupFailedMessage">
                You are already registered. Please sign in.
              </div>
            )}
            <form className="emailForm" onSubmit={handlesignupFormSubmit}>
              <label htmlFor="signupname">Name</label>
              <input type="text" placeholder="abc" required id="signupname" name="signupname"/>
              <label htmlFor="email">Email address</label>
              <input type="signupemail" placeholder="abc@gmail.com" required id="signupemail" name="signupemail"/>
              <label htmlFor="signuppassword">Password</label>
              <input type="password" placeholder="must have atleast 6 characters" required id="signuppassword" name="signuppassword"/>
              <button type="submit">Sign up</button>
            </form>
            <div className="emailFooter">
              <div className="line-container">
                <div className="gray-line"></div>
                <div className="centered-text">Already a member?</div>
                <div className="gray-line"></div>
              </div>
              <div className="joinUs">
                <span><a onClick={goBack}>Sign In</a> using your EcoVoyage Account</span>
              </div>
            </div>
            <Close className="buttonClose" onClick={onClose} />
          </div>
  )
}
