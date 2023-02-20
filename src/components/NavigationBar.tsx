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
    <nav>
      <div>
        <h1>
          <strong>React</strong> Chat App
        </h1>
        <nav>
          <ul>
            <li><Link to='/app-ideas'>App Ideas</Link></li>
          </ul>
        </nav>
        {user && (
          <div className="login_h">
            <Avatar src={user?.photoURL} />
            <button
              className="text-gray-400 hover:text-white"
              onClick={logout}
            >
                            SignOut
            </button>
          </div>
        )}
        {!user && (
          <Link style={{ color: "gray" }} to="/">
                        Sign in
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavigationBar
