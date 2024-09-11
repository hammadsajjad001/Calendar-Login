import CalendarRouting from "./components/CalandarRouting";
import React from "react";
import Sidebar from "./Sidebar";
import Logout from "./Logout";

export default function Home() {
  const username = localStorage.getItem("name");
  return (
    <>
      <div style={{ marginTop: "2.3rem" }}>
        <div className="loggedUser">
          <h2 style={{ textAlign: "center" }}>Welcome {username}!</h2>
        </div>
        <Logout />
      </div>
      <div>
        <Sidebar />
        <CalendarRouting />
      </div>
    </>
  );
}
