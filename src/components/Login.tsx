import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth, loginWithEmailAndPassword, signInWithGoogle } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import "./Login.css" 

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return
    }
    if (user) navigate("dashboard")
  }, [user, loading, navigate])

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className="login__btn"
          onClick={() => loginWithEmailAndPassword(email, password)}
        >
                    Login
        </button>
        <button
          className="login__btn login__google"
          onClick={() => signInWithGoogle()}
        >
                    Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password?</Link>
        </div>
        <div>Don&apos;t have an account?<Link to="/register">Register</Link></div>
      </div>
    </div>
  )
}

export default Login
