import React from "react"
import { Link, Outlet, Route, Routes } from "react-router-dom"
import Bin2Dec from "./Bin2Dec"
import BorderRadiusPreviewer from "./BorderRadiusPreviewer"

const AppIdeas = () => {
  return (
    <>
      <div data-theme="cyberpunk">
        <p>Here I place apps from <Link to="https://github.com/florinpop17/app-ideas">App Ideas</Link> which I&apos;ve found in Redux tutorial.</p>
        <ul>
          <li><Link to="/app-ideas/bin2dec">Bin2Dec</Link></li>
          <li><Link to="/app-ideas/border-radius-previewer">BorderRadiusPreviewer</Link></li>
        </ul>
        
        
      </div>
      <Outlet />
      <Routes>
        <Route path={"bin2dec"} element={<Bin2Dec />} />
        <Route path={"border-radius-previewer"} element={<BorderRadiusPreviewer />} />
      </Routes>
    </>
  )
}

export default AppIdeas