import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

export default function Profile() {
  const { user,setUser } = useContext(AuthContext);

  const [editedUser, setEditedUser] = useState({});
  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    phone: false,
    address: false,
    dob: false,
  });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = async (fieldName) => {
    try {
      // Make an HTTP PUT request to update the user data
    const response = await axios.put(`/api/users/update/${user._id}`, {
        ...editedUser,
      });

    
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
     
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const toggleEdit = (fieldName) => {
    setEditedUser({
      ...editedUser,
      [fieldName]: user ? user[fieldName] : "",
    });

    setEditMode({
      ...editMode,
      [fieldName]: !editMode[fieldName],
    });
  };

  const handlePicture = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make an HTTP POST request to the server to upload the image
    await axios.post(`/api/users/upload/${user._id}`, formData).then((res) => {
        setEditedUser({ ...editedUser, picture: res.data.picture });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

      });
    } catch (error) {
      console.error('Error uploading picture:', error);
    }
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
            <label htmlFor="file" className="profileImgLabel">
    <input
      type="file"
      id="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={handlePicture}
      className="profilePageImg"
    />
    <img
      src={
        user
          ? user.picture
            ? user.picture
            : "/images/dummyProfilePic.png"
          : "/images/dummyProfilePic.png"
      }
      alt=""
      className="profilePageImg"
    />
  </label>
          </div>
        </div>
        <div className="profileRight">
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
                user.username?
                user.username
                :<i>Update your username</i>
              ) : (
                <i>Update your username</i>
              )}
              <div
                className="profileInfoSubItemEditBtn"
                onClick={() => toggleEdit("username")}
              >
                {editMode.username ? "Cancel" : "Edit"}
                {editMode.username && (
                  <div
                    className="profileInfoSubItemSaveBtn"
                    onClick={handleSave}
                  >
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
                  type="email"
                  name="email"
                  unique = "true"
                  value={editedUser.email}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.email?
                user.email
                :<i>Update your email</i>

              )  : (
                <i>Update your email</i>
              )}
              <div
                className="profileInfoSubItemEditBtn"
                onClick={() => toggleEdit("email")}
              >
                {editMode.email ? "Cancel" : "Edit"}
                {editMode.email && (
                  <div
                    className="profileInfoSubItemSaveBtn"
                    onClick={handleSave}
                  >
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
                  type="number"
                  maxLength="10"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.phone ?
                user.phone
                :<i>Update your phone number</i>
              )  : (
                <i>Update your phone number</i>
              )}
              <div
                className="profileInfoSubItemEditBtn"
                onClick={() => toggleEdit("phone")}
              >
                {editMode.phone ? "Cancel" : "Edit"}
                {editMode.phone && (
                  <div
                    className="profileInfoSubItemSaveBtn"
                    onClick={handleSave}
                  >
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
                user.address ?
                user.address
                :<i>Update your address</i>

              )  : (
                <i>Update your address</i>
              )}
              <div
                className="profileInfoSubItemEditBtn"
                onClick={() => toggleEdit("address")}
              >
                {editMode.address ? "Cancel" : "Edit"}
                {editMode.address && (
                  <div
                    className="profileInfoSubItemSaveBtn"
                    onClick={handleSave}
                  >
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
                  type="date"
                  name="dob"
                  value={editedUser.dob}
                  onChange={handleEdit}
                  className="profileInfoSubItemEditInput"
                />
              ) : user ? (
                user.dob ?
                user.dob.split('T')[0]
                :<i>Update your date of birth</i>
              )  : (
                <i>Update your date of birth</i>
              )}
              <div
                className="profileInfoSubItemEditBtn"
                onClick={() => toggleEdit("dob")}
              >
                {editMode.dob ? "Cancel" : "Edit"}
                {editMode.dob && (
                  <div
                    className="profileInfoSubItemSaveBtn"
                    onClick={handleSave}
                  >
                    Save
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
