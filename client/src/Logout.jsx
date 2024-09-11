import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <button
      style={{
        padding: "3px 23px",
        textDecoration: "none",
        backgroundColor: "#1f8ef1",
        color: "white",
        borderRadius: "4px",
        border:"none"
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
