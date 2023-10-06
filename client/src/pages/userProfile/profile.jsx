import React, { useContext, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../context/authContext";

export default function Profile({ newUser }) {
  const { user } = useContext(AuthContext);
  

  return (
    <div className="profilePage">
      <div className="profileWrapper">
        <div className="profileLeft">
          <div className="profileHeading">Personal Info</div>
          <div className="profileImgContainer">
            <div className="editIcon">
              <img src="/images/pen.png" alt="" />
            </div>
            <img
              className="profilePageImg"
              src={
                user
                  ? user.picture
                    ? user.picture
                    : "/images/dummyProfilePic.png"
                  : newUser.picture
                  ? newUser.picture
                  : "/images/dummyProfilePic.png"
              }
              alt=""
            />
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Name</span>
            <div className="profileInfoSubItem">
            {user ?
              user.username?
              user.username
              :<i>Update your username</i>
               : newUser.username ? (
                newUser.username
              ) : (
                <i>Update your username</i>
              )}
              <div className="profileInfoSubItemEditBtn">
                Edit
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Email</span>
            <div className="profileInfoSubItem">
            {user ?
              user.email?
              user.email
              :<i>Update your email</i>
               : newUser.email ? (
                newUser.email
              ) : (
                <i>Update your email</i>
              )}
              <div className="profileInfoSubItemEditBtn">
                Edit
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Phone</span>
            <div className="profileInfoSubItem">
            {user ?
              user.phone?
              user.phone
              :<i>Update your phone no.</i>
               : newUser.phone ? (
                newUser.phone
              ) : (
                <i>Update your phone no.</i>
              )}
              <div className="profileInfoSubItemEditBtn">
                Edit
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Address</span>
            <div className="profileInfoSubItem">
            {user ?
              user.address?
              user.address
              :<i>Update your address</i>
               : newUser.address ? (
                newUser.address
              ) : (
                <i>Update your address</i>
              )}
              <div className="profileInfoSubItemEditBtn">
                Edit
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">D.O.B</span>
            <div className="profileInfoSubItem">
              {user ?
              user.dob?
              user.dob
              :<i>Update your date of birth</i>
               : newUser.dob ? (
                newUser.dob.split("T")[0]
              ) : (
                <i>Update your date of birth</i>
              )}
              <div className="profileInfoSubItemEditBtn">
                Edit
              </div>
            </div>
          </div>
        </div>
        <div className="profileRight">Right</div>
      </div>
    </div>
  );
}
