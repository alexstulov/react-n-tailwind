import React from "react"
import { Link, Outlet, Route, Routes } from "react-router-dom"
import Bin2Dec from "./Bin2Dec"
import BorderRadiusPreviewer from "./BorderRadiusPreviewer"

const AppIdeas = () => {
  return (
    <>
      <div data-theme="cyberpunk" className="p-4">
        <div className="flex flex-col justify-start text-left">
          <h2 className="heading-2 my-4">App Ideas</h2>
          <p>Here I place apps from <Link className="link link-neutral" to="https://github.com/florinpop17/app-ideas">App Ideas</Link> which I&apos;ve found in Redux tutorial.</p>
          <ul className="menu menu-horizontal bg-base-100 rounded-box">
            <li><Link to="/app-ideas/bin2dec">Bin2Dec</Link></li>
            <li><Link to="/app-ideas/border-radius-previewer">BorderRadiusPreviewer</Link></li>
          </ul>
          <Outlet />
          <Routes>
            <Route path={"bin2dec"} element={<Bin2Dec />} />
            <Route path={"border-radius-previewer"} element={<BorderRadiusPreviewer />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default AppIdeas