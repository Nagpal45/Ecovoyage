import { ArrowBack, Close } from '@material-ui/icons'
import React from 'react'

export default function SigninForm(
    { onClose, SignIngoBack, handlesigninFormSubmit, signUpWithEmail }
) {
  return (
    <div className="emailFormWrapper">
    <ArrowBack className="buttonBack" onClick={SignIngoBack} />
    <div className="emailHeader">
      <img className="signinLogo" src="/images/logo.png" alt="" />
      <h2>Welcome back.</h2>
    </div>
    <form className="emailForm" onSubmit={handlesigninFormSubmit}>
      <label htmlFor="signinemail">Email address</label>
      <input type="email" placeholder="abc@gmail.com" required id="signinemail" name="signinemail"/>
      <label htmlFor="password">Password</label>
      <input type="password" placeholder="must have atleast 6 characters" required id="signinpassword" name="signinpassword"/>
      <button type="submit">Sign in</button>
    </form>
    <div className="emailFooter">
      <div className="line-container">
        <div className="gray-line"></div>
        <div className="centered-text">Not a member?</div>
        <div className="gray-line"></div>
      </div>
      <div className="joinUs">
        <span><a onClick={signUpWithEmail}>Join us</a> to unlock the best of EcoVoyage</span>
      </div>
    </div>
    <Close className="buttonClose" onClick={onClose} />
  </div>
  )
}
