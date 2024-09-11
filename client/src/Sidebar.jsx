import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaReact, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { PiImagesLight } from "react-icons/pi";
import { HiOutlineChartPie } from "react-icons/hi2";
import { TbHexagons } from "react-icons/tb";
import { SiGoogleforms } from "react-icons/si";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { BsPinAngle, BsAlarm } from "react-icons/bs";
import { VscTools } from "react-icons/vsc";
import { HiOutlineChartBar } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";
import { IoAccessibilityOutline } from "react-icons/io5";
import { SiPolywork } from "react-icons/si";

import "./sideBar.css";

const SideBarComponent = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="sidebar-main">
    <div className="sidebar">
      <div className="sidebar-header">
        <FaReact className="react-icon" />
        <h5>CREATIVE TIM</h5>
      </div>
      <ul className="dropdown-ul">
        <li>
          <HiOutlineChartPie className="sidebar-icon" />
            <Link to="/home">
            <span className="notdropdown">Dashboard</span>
          </Link>
        </li>
        {/* Pages */}
        <li onClick={() => handleToggle(1)}>
          <PiImagesLight className="sidebar-icon"/>
          <span>Pages</span>
          {activeDropdown === 1 ? (
            <FaCaretUp className="caret" />
          ) : (
            <FaCaretDown className="caret" />
          )}
          <ul className={`dropdown ${activeDropdown === 1 ? "active" : ""}`}>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/rtl-support">RTL Support</Link>
            </li>
            <li>
              <Link to="/timeline">TimeLine</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/lock-screen">Lock Screen</Link>
            </li>
            <li>
              <Link to="/user-profile">User Profile</Link>
            </li>
          </ul>
        </li>
        {/* Components */}
        <li onClick={() => handleToggle(2)}>
          <TbHexagons className="sidebar-icon"/>
          <span>Components</span>
          {activeDropdown === 2 ? (
            <FaCaretUp className="caret" />
          ) : (
            <FaCaretDown className="caret" />
          )}
          <ul className={`dropdown ${activeDropdown === 2 ? "active" : ""}`}>
            <li>
              <Link to="/multi-level-collapse">MultiLevel Collapse</Link>
            </li>
            <li>
              <Link to="/buttons">Buttons</Link>
            </li>
            <li>
              <Link to="/grid-system">Grid System</Link>
            </li>
            <li>
              <Link to="/panels">Panels</Link>
            </li>
            <li>
              <Link to="/sweet-alert">Sweet Alert</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
            <li>
              <Link to="/icons">Icons</Link>
            </li>
            <li>
              <Link to="/typography">Typography</Link>
            </li>
          </ul>
        </li>
        {/* Forms */}
        <li onClick={() => handleToggle(3)}>
          <SiGoogleforms className="sidebar-icon"/>
          <span>Forms</span>
          {activeDropdown === 3 ? (
            <FaCaretUp className="caret" />
          ) : (
            <FaCaretDown className="caret" />
          )}
          <ul className={`dropdown ${activeDropdown === 3 ? "active" : ""}`}>
            <li>
              <Link to="/regular-forms">Regular Forms</Link>
            </li>
            <li>
              <Link to="/extended-forms">Extended Forms</Link>
            </li>
            <li>
              <Link to="/validation-forms">Validation Forms</Link>
            </li>
            <li>
              <Link to="/wizard">Wizard</Link>
            </li>
          </ul>
        </li>
        {/* Tables */}
        <li onClick={() => handleToggle(4)}>
          <IoExtensionPuzzleOutline className="sidebar-icon"/>
          <span>Tables</span>
          {activeDropdown === 4 ? (
            <FaCaretUp className="caret" />
          ) : (
            <FaCaretDown className="caret" />
          )}
          <ul className={`dropdown ${activeDropdown === 4 ? "active" : ""}`}>
            <li>
              <Link to="/regular-tables">Regular Tables</Link>
            </li>
            <li>
              <Link to="/extended-tables">Extended Tables</Link>
            </li>
            <li>
              <Link to="/react-tables">React Tables</Link>
            </li>
          </ul>
        </li>
        {/* Maps */}
        <li onClick={() => handleToggle(5)}>
          <BsPinAngle className="sidebar-icon"/>
          <span>Maps</span>
          {activeDropdown === 5 ? (
            <FaCaretUp className="caret" />
          ) : (
            <FaCaretDown className="caret" />
          )}
          <ul className={`dropdown ${activeDropdown === 5 ? "active" : ""}`}>
            <li>
              <Link to="/google-maps">Google Maps</Link>
            </li>
            <li>
              <Link to="/full-screen-map">Full Screen Map</Link>
            </li>
            <li>
              <Link to="/vector-map">Vector Map</Link>
            </li>
          </ul>
        </li>
        <li>
          <VscTools className="sidebar-icon"/>

          <Link to="/widgets">
            <span className="notdropdown">WIDGETS</span>
          </Link>
        </li>
        <li>
          <HiOutlineChartBar className="sidebar-icon"/>
          <Link to="/charts">
            <span className="notdropdown">CHARTS</span>
          </Link>
        </li>
        <li>
          <BsAlarm className="sidebar-icon"/>
          <Link to="/calendar">
            <span className="notdropdown">CALENDAR</span>
          </Link>
        </li>
        <li>
          <SiPolywork className="sidebar-icon"/>
          <Link to="/roles">
            <span className="notdropdown">ROLES</span>
          </Link>
        </li>
        <li>
          <IoAccessibilityOutline className="sidebar-icon"/>
          <Link to="/permissions">
            <span className="notdropdown">PERMISSIONS</span>
          </Link>
        </li>
        <li>
          <LuUser className="sidebar-icon"/>
          <Link to="/usertab">
            <span className="notdropdown">USERS</span>
          </Link>
        </li>
      </ul>
    </div>
    </div>
  );
};

export default SideBarComponent;
