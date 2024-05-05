import { Outlet } from "react-router-dom"

import Navbar from "./layout/Navbar"

const Layout = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center">
      <Navbar />
      <div className="bg-muted flex-1 w-full px-7 lg:px-24 xl:px-36 py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout