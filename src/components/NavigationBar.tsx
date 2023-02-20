import React, { useEffect } from "react"
import Avatar from "./Avatar"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth, logout } from "../firebase"

const NavigationBar = () => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) {
      return
    }
    if (user) navigate("/chat")
  }, [loading, user, navigate])

  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 
  bg-base-100 text-base-content">
      <nav className="navbar bg-base-100 w-full">
        <div className="flex flex-1 md:gap-1 lg:gap-2">
          <Link to="/"><h1 className="heading-1 text-primary">
            <strong>React</strong> & Tailwind
          </h1></Link>
        </div>
        
        <ul className="menu menu-horizontal bg-base-100 p-0">
          <li>
            <span>Menu</span>
            <ul className="bg-base-100 p-0">
              <li><Link to='/app-ideas'>App Ideas</Link></li>
              <li><Link to='/tic-tac-toe'>Tic Tac Toe</Link></li>
              <li><Link to='/todo'>Todo</Link></li>
              <li><Link to='/exercises'>Exersices</Link></li>
            </ul>
          </li>
        </ul>
        {user && (
          <div className="login_h">
            <Avatar src={user?.photoURL} />
            <button
              className="text-gray-400 hover:text-white"
              onClick={logout}
            >SignOut</button>
          </div>
        )}
        {!user && (
          <Link style={{ color: "gray" }} to="/">
                        Sign in
          </Link>
        )}
      </nav>
    </div>
  )
}

export default NavigationBar
