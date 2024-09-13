// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaReact } from "react-icons/fa";
// import { HiOutlineChartPie } from "react-icons/hi2";
// import { BsAlarm } from "react-icons/bs";
// import { LuUser } from "react-icons/lu";
// import { IoAccessibilityOutline } from "react-icons/io5";
// import { SiPolywork } from "react-icons/si";
// import "./sideBar.css";

// const SideBar = ({ isOpen, toggleSidebar }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleMouseEnter = () => {
//     if (!isExpanded) {
//       setIsExpanded(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isExpanded) {
//       setIsExpanded(false);
//     }
//   };

//   const handleBarBtnClick = () => {
//     setIsExpanded(!isExpanded);
//     toggleSidebar(!isOpen);
//   };

//   return (
//     <>
//       <i className="bi bi-list-ul" style={{position:'absolute', top:'4.3%', left:'3.8%',fontSize:'1.6rem'}} onClick={handleBarBtnClick}></i>
//       <div
//         className={`sidebar ${isExpanded ? "expanded" : "collapsed"} ${isOpen ? "open" : ""}`}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <div className="sidebar-header">
//           <FaReact className="react-icon" />
//           {isExpanded && <h5>CREATIVE TIM</h5>}
//         </div>
//         <ul className="dropdown-ul">
//           <li>
//             <HiOutlineChartPie className="sidebar-icon" />
//             <Link to="/home">
//               <span className="notdropdown">Dashboard</span>
//             </Link>
//           </li>
//           <li>
//             <BsAlarm className="sidebar-icon" />
//             <Link to="/calendar">
//               <span className="notdropdown">Event Manager</span>
//             </Link>
//           </li>
//           <li>
//             <SiPolywork className="sidebar-icon" />
//             <Link to="/roles">
//               <span className="notdropdown">ROLES</span>
//             </Link>
//           </li>
//           <li>
//             <IoAccessibilityOutline className="sidebar-icon" />
//             <Link to="/permissions">
//               <span className="notdropdown">PERMISSIONS</span>
//             </Link>
//           </li>
//           <li>
//             <LuUser className="sidebar-icon" />
//             <Link to="/usertab">
//               <span className="notdropdown">USERS</span>
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default SideBar;

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { HiOutlineChartPie } from "react-icons/hi2";
import { BsAlarm } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { IoAccessibilityOutline } from "react-icons/io5";
import { SiPolywork } from "react-icons/si";
import "./sideBar.css";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("/home"); // Default active item
  const location = useLocation(); // Get the current route location
  const currentPath = location.pathname;

  // const getPageName = (path) => {
  //   switch (path) {
  //     case "/home":
  //       return "Dashboard";
  //     case "/calendar":
  //       return "Event Manager";
  //     case "/roles":
  //       return "Roles";
  //     case "/permissions":
  //       return "Permissions";
  //     case "/usertab":
  //       return "Users";
  //     default:
  //       return "Home";
  //   }
  // };
  // const pageName = getPageName(currentPath);

  const handleMouseEnter = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleBarBtnClick = () => {
    setIsExpanded(!isExpanded);
    toggleSidebar(!isOpen);
  };

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  const menuItems = [
    {
      path: "/home",
      icon: <HiOutlineChartPie className="sidebar-icon" />,
      label: "DASHBOARD",
    },
    {
      path: "/calendar",
      icon: <BsAlarm className="sidebar-icon" />,
      label: "EVENT MANAGER",
    },
    {
      path: "/roles",
      icon: <SiPolywork className="sidebar-icon" />,
      label: "ROLES",
    },
    {
      path: "/permissions",
      icon: <IoAccessibilityOutline className="sidebar-icon" />,
      label: "PERMISSIONS",
    },
    {
      path: "/usertab",
      icon: <LuUser className="sidebar-icon" />,
      label: "USERS",
    },
  ];

  return (
    <>
      <i
        className="bi bi-list-ul"
        style={{
          position: "absolute",
          top: "4.3%",
          left: "3.8%",
          fontSize: "1.6rem",
        }}
        onClick={handleBarBtnClick}
      ></i>
      <div
        className={`sidebar ${isExpanded ? "expanded" : "collapsed"} ${
          isOpen ? "open" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sidebar-header">
          <FaReact className="react-icon" />
          {isExpanded && <h5>CREATIVE TIM</h5>}
        </div>
        <ul className="dropdown-ul">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={activeItem === item.path ? "active" : ""}
              onClick={() => handleItemClick(item.path)}
            >
              {item.icon}
              <Link to={item.path}>
                <span className="notdropdown">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SideBar;
