import React, { useContext } from "react";
import "./profile.css";
import { AuthContext } from "../../context/authContext";

export default function Profile({ newUser }) {
  const { user } = useContext(AuthContext);

  const profileInfoItems = [
    { label: 'Username', key: 'username', placeholder: 'Update Username' },
    { label: 'Email', key: 'email', placeholder: 'Update Email id' },
    { label: 'Phone No.', key: 'phone', placeholder: 'Update Phone No.' },
    { label: 'Address', key: 'address', placeholder: 'Update Address' },
  ];
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
                  : newUser.picture
                  ? newUser.picture
                  : "/images/dummyProfilePic.png"
              }
              alt=""
            />
          </div>
          {profileInfoItems.map((item) => (
    <div className="profileInfoItem" key={item.key}>
      <span className="profileInfoSubItemLabel">{item.label}</span>
      <span className="profileInfoSubItem">
        {user ? (
          user[item.key]
        ) : newUser[item.key] ? (
          newUser[item.key]
        ) : (
          <i>{item.placeholder}</i>
        )}
      </span>
    </div>
  ))}
  <div className="profileInfoItem" >
      <span className="profileInfoSubItemLabel">D.O.B</span>
      <span className="profileInfoSubItem">
        {user ? (
          user.dob
        ) : newUser.dob ? (
          newUser.dob.split("T")[0]
        ) : (
          <i>Update your date of birth</i>
        )}
      </span>
    </div>
        </div>
        <div className="profileRight">Right</div>
      </div>
    </div>
  );
}
