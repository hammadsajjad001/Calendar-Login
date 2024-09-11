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
        padding: "8px 15px",
        textDecoration: "none",
        backgroundColor: "#1f8ef1",
        color: "white",
        borderRadius: "4px",
        position: "absolute",
        right: "5%",
        top: "3%",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
