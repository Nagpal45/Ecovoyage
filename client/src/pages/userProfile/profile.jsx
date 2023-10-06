import React, { useContext, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../context/authContext";

export default function Profile({ newUser }) {
  const { user } = useContext(AuthContext);

  const [editedUser, setEditedUser] = useState({});
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    phone: false,
    address: false,
    dob: false,
  });

  const handleEdit = (e) => {
   const {name, value} = e.target;
   setEditedUser({...editedUser, [name]: value});
  }

  const handleSave = (e) => {

   }

   const toggleEdit = (fieldName) => {
    setEditedUser({
      ...editedUser,
      [fieldName]: user ? user[fieldName] : newUser[fieldName] || "",
    });

    setEditMode({
      ...editMode,
      [fieldName]: !editMode[fieldName],
    });
    
   }




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
            {editMode.username ? (
                <input
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.username
              ) : newUser.username ? (
                newUser.username
              ) : (
                <i>Update your username</i>
              )}
              <div className="profileInfoSubItemEditBtn" onClick={() => toggleEdit("username")}>
                {editMode.username ? "Cancel" : "Edit"}
              {editMode.username && (
                <div className="profileInfoSubItemSaveBtn" onClick={handleSave}>
                  Save
                </div>
              )}
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Email</span>
            <div className="profileInfoSubItem">
            {editMode.email ? (
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.email
              ) : newUser.email ? (
                newUser.email
              ) : (
                <i>Update your email</i>
              )}
              <div className="profileInfoSubItemEditBtn" onClick={() => toggleEdit("email")}>
                {editMode.email ? "Cancel" : "Edit"}
              {editMode.email && (
                <div className="profileInfoSubItemSaveBtn" onClick={handleSave}>
                  Save
                </div>
              )}
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Phone</span>
            <div className="profileInfoSubItem">
            {editMode.phone ? (
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.phone
              ) : newUser.phone ? (
                newUser.phone
              ) : (
                <i>Update your phone number</i>
              )}
              <div className="profileInfoSubItemEditBtn" onClick={() => toggleEdit("phone")}>
                {editMode.phone ? "Cancel" : "Edit"}
              {editMode.phone && (
                <div className="profileInfoSubItemSaveBtn" onClick={handleSave}>
                  Save
                </div>
              )}
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">Address</span>
            <div className="profileInfoSubItem">
            {editMode.address ? (
                <input
                  type="text"
                  name="address"
                  value={editedUser.address}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.address
              ) : newUser.address ? (
                newUser.address
              ) : (
                <i>Update your address</i>
              )}
              <div className="profileInfoSubItemEditBtn" onClick={() => toggleEdit("address")}>
                {editMode.address ? "Cancel" : "Edit"}
              {editMode.address && (
                <div className="profileInfoSubItemSaveBtn" onClick={handleSave}>
                  Save
                </div>
              )}
              </div>
            </div>
          </div>
          <div className="profileInfoItem">
            <span className="profileInfoSubItemLabel">D.O.B</span>
            <div className="profileInfoSubItem">
            {editMode.dob ? (
                <input
                  type="text"
                  name="dob"
                  value={editedUser.dob}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.dob
              ) : newUser.dob ? (
                newUser.dob.split("T")[0]
              ) : (
                <i>Update your date of birth</i>
              )}
              <div className="profileInfoSubItemEditBtn" onClick={() => toggleEdit("dob")}>
                {editMode.dob ? "Cancel" : "Edit"}
              {editMode.dob && (
                <div className="profileInfoSubItemSaveBtn" onClick={handleSave}>
                  Save
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
        <div className="profileRight">Right</div>
      </div>
    </div>
  );
}
