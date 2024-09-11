import React from 'react';
import {Link} from "react-router-dom"
const Sidebar = () => {

  return (
    <div className="sidebar-main">
      <div id="mySidenav" className="sidenav">
        <ul>
          <li><Link to="/home/"><h5>Calendar</h5></Link></li>
          <li><Link to="/roles"><h5>Roles</h5></Link></li>
          <li><Link to="/permissions"><h5>Permissions</h5></Link></li>
          <li><Link to="/usertab"><h5>Users</h5></Link></li>
        </ul>
      </div>
    </div>

  );
};

export default Sidebar;
