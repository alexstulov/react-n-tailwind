import React from "react"
import { Provider } from "react-redux"
import { Link, Outlet, Route, Routes } from "react-router-dom"
import store from "./store"
import Users from "./Users"

const CRUD = () => {
  return <Provider store={store}>
    <div data-theme="cupcake">
      <h2 className='heading-2 my-4 p-2 bg-base-300'>CRUD</h2>
      <p>A couple of tables include multiple approaches with accent on data fetching and in-app processing</p>
      <div className="tabs bg-accent mt-4 p-2">
        <Link className={`tab tab-bordered ${location.pathname.includes("users") && "tab-active"}`} to="/crud/users">Users</Link>
      </div>
      <Outlet />
      <Routes>
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  </Provider>
}

export default CRUD