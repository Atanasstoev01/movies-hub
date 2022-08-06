import "./AdminUserData.scss";
import React, { useContext } from "react";
import ProfilePic from '../../views/Profile/profile.svg';
import { useState } from "react";
import { userRole } from '../../common/user-role.js';


function AdminUserData(props) {
  const handleRoles = (e) => {
    props.checkPhoneNum(e, props.phone, props.username)
  }

  const picture = props.image ? props.image : ProfilePic;
  return (
    <tr className="alert" id={props.username} role="alert">
      <td>
        <label className="checkbox-wrap checkbox-primary">
          <input type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </td>
      <td className="d-flex align-items-center">
      <img src={picture} alt="Profile pciture" className="img" />
        {props.firstLastName}
        </td>
      <td>{props.username}</td>
      <td className="">
        <div className="pl-3 email">
          <span>{props.email}</span>
        </div>
      </td>
      <td>
      <select id="roles" onChange={handleRoles} value={props.role}>
        <option value={userRole.ADMIN}>Admin user</option>
        <option value={userRole.BASIC}>Regular user</option>
      </select>
      </td>
      <td className="status">
        <span className={props.status === "active" ? "active" : "blocked"}>
          {props.status}
        </span>
      </td>
      <td>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">
            <i className="fa fa-close"></i>
          </span>
        </button>
      </td>
    </tr>
  );
}

export default AdminUserData;
