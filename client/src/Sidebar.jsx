import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ height: '100vh', overflow: 'scroll initial', zIndex: 1000, position: 'absolute', marginLeft: '30px' }}>
            <CDBSidebar textColor="#fff" backgroundColor='#1f8ef1' >
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <h5 className="text-decoration-none" style={{ color: 'inherit' }}>
                        Dashboard
                    </h5>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/home" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Calendar</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/roles" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Roles</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/permissions" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Permissions</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;