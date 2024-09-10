import CalendarRouting from "./components/CalandarRouting"

import React from 'react'
import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <div><Link to="/" style={{ padding: "8px 15px", textDecoration: "none", backgroundColor: "#1f8ef1", color: "white", borderRadius: "4px", position: "absolute", right: "5%", top: "3%" }}>Logout</Link></div>
      <div>
        <Sidebar />
      </div>
      <div>
        <CalendarRouting />
      </div>
    </>
  )
}
