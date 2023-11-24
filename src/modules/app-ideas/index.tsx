import React from "react"
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import Bin2Dec from "./Bin2Dec"
import BorderRadiusPreviewer from "./BorderRadiusPreviewer"

import { Provider } from "react-redux";
import store from "./store"
import Calculator from "./calculator";
import {ChristmasLights} from "./christmasLights";

const AppIdeas = () => {
  const location = useLocation()
  return (
    <Provider store={store}>
      <div data-theme="cyberpunk" className="p-4 h-full md:h-[calc(100vh-5rem)]">
        <div className="flex flex-col justify-start text-left">
          <h2 className="heading-2 my-4 p-2 bg-base-300">App Ideas</h2>
          <p>Here I place apps from <Link className="link link-neutral" to="https://github.com/florinpop17/app-ideas" target="_blank">App Ideas</Link> that I&apos;ve found in Redux tutorial.</p>
          <div className="tabs bg-accent mt-4 p-2">
            <Link className={`tab tab-bordered ${location.pathname.includes("bin2dec") && "tab-active"}`} to="/app-ideas/bin2dec">Bin2Dec</Link>
            <Link className={`tab tab-bordered ${location.pathname.includes("border-radius-previewer") && "tab-active"}`} to="/app-ideas/border-radius-previewer">BorderRadiusPreviewer</Link>
            <Link className={`tab tab-bordered ${location.pathname.includes("calculator") && "tab-active"}`} to="/app-ideas/calculator">Calculator</Link>
            <Link className={`tab tab-bordered ${location.pathname.includes("christmasLights") && "tab-active"}`} to="/app-ideas/christmas-lights">X-mas Lights</Link>
          </div>
          <Outlet />
          <Routes>
            <Route path={"bin2dec"} element={<Bin2Dec />} />
            <Route path={"border-radius-previewer"} element={<BorderRadiusPreviewer />} />
            <Route path={"calculator"} element={<Calculator />} />
            <Route path={"christmas-lights"} element={<ChristmasLights />} />
          </Routes>
        </div>
      </div>
    </Provider>
  )
}

export default AppIdeas