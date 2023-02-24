import React, { useEffect } from "react"
import { Provider } from "react-redux"
import { Link, Outlet, Route, Routes } from "react-router-dom"
import { fetchUsers } from "./slices/userSlice"
import store from "./store"
import User from "./User"
import UserCreate from "./UserCreate"
import Users from "./Users"
import UserUpdate from "./UserUpdate"

const CRUD = () => {
  useEffect(() => {
    store.dispatch(fetchUsers())
  }, [])
  return <Provider store={store}>
    <div data-theme="cupcake">
      <h2 className='heading-2 my-4 p-2 bg-base-300'>CRUD</h2>
      <p>A couple of tables include multiple approaches to data fetching and in-app processing</p>
      <div className="tabs bg-accent mt-4 p-2">
        <Link className={`tab tab-bordered ${location.pathname.includes("users") && "tab-active"}`} to="/crud/users">Users</Link>
      </div>
      <Outlet />
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
        <Route path="users/update/:userId" element={<UserUpdate />} />
        <Route path="users/create" element={<UserCreate />} />
      </Routes>
    </div>
  </Provider>
}

export default CRUD