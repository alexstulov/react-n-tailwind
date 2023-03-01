import React, { useEffect } from "react"
import { Provider } from "react-redux"
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { fetchUsers } from "./slices/userSlice"
import store from "./store"
import User from "./components/User/User"
import UserCreate from "./components/User/UserCreate"
import Users from "./components/User/Users"
import UserUpdate from "./components/User/UserUpdate"
import Posts from "./components/Post/Posts"
import classNames from "classnames"
import Post from "./components/Post/Post"
import PostCreate from "./components/Post/PostCreate"
import PostUpdate from "./components/Post/PostUpdate"

const CRUD = () => {
  const location = useLocation()
  useEffect(() => {
    store.dispatch(fetchUsers())
  }, [])

  return <Provider store={store}>
    <div data-theme="cupcake">
      <h2 className='heading-2 my-4 p-2 bg-base-300'>CRUD</h2>
      <p>A couple of tables include multiple approaches to data fetching and in-app processing</p>
      <div className="tabs bg-accent mt-4 p-2">
        <Link className={classNames("tab tab-bordered", {"tab-active": location.pathname.includes("users")})} to="/crud/users">Users</Link>
        <Link className={classNames("tab tab-bordered", {"tab-active": location.pathname.includes("posts")})} to="/crud/posts">Posts</Link>
      </div>
      <Outlet />
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<User />} />
        <Route path="users/update/:userId" element={<UserUpdate />} />
        <Route path="users/create" element={<UserCreate />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:postId" element={<Post />} />
        <Route path="posts/create" element={<PostCreate />} />
        <Route path="posts/update/:postId" element={<PostUpdate />} />
      </Routes>
    </div>
  </Provider>
}

export default CRUD