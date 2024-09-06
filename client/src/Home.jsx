import CalendarRouting from "./components/CalandarRouting"

import React from 'react'
import Sidebar from "./Sidebar"

export default function Home() {
  return (
    <>
    <div>
      <Sidebar/>
    </div>
    <div>
      <CalendarRouting />
    </div>
    </>
  )
}
