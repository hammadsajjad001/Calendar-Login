/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import Logout from "../../../Logout";
import "./navBar.css";
import navImage from "../../../images/nav-profile.jpg";

export default function NavBarComponent({ isSidebarOpen, toggleSidebar }) {
  const username = localStorage.getItem("name");
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [activityDropdown, setActivityDropdown] = useState(false);
  const handleSidebarToggle = () => {
    toggleSidebar(!isSidebarOpen);
  };

  function setOpen() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleProfile() {
    setProfileDropdown(!profileDropdown);
  }

  function handleActivity() {
    setActivityDropdown(!activityDropdown);
  }
  return (
    <div className="navbar-main">
      <div className="nav-bar-content-container">
        <div className="nav-header-left">
          {/* <i class="bi bi-list-ul nav-sidebar-icon" onClick={handleSidebarToggle}></i> */}
          <h5 className="dashboard-heading">DASHBOARD</h5>
        </div>
        <div className="nav-header-right">
          <div className="nav-search-activity">
            <i className="bi bi-search" onClick={setOpen}></i>
            <i className="bi bi-activity" onClick={handleActivity}></i>
          </div>
          <div className="profile-menu" onClick={handleProfile}>
            <img src={navImage} className="nav-profile-pic"></img>
            <i
              className="bi bi-caret-down-fill nav-caret-down"
              style={{ fontSize: "15px" }}
            ></i>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="search-container">
          <input
            type="text"
            placeholder="SEARCH"
            className="search-bar"
          ></input>
          <i className="bi bi-x search-close-icon" onClick={handleClose}></i>
        </div>
      )}
      {activityDropdown && (
        <div className="activity-dropdown">
          <li>Mike John responded to your email</li>
          <li>You 5 more tasks</li>
          <li>Your friend Michael is in town</li>
          <li>Another notification</li>
          <li>Another one</li>
        </div>
      )}
      {profileDropdown && (
        <div className="profile-dropdown">
          <h5 style={{ color: "black" }}>{username}</h5>
          <Logout />
        </div>
      )}
    </div>
  );
}
