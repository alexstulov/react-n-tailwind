import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, redirect } from "react-router-dom"
import { auth, sendPasswordReset } from "../firebase"
import "./Reset.css"

const Reset = () => {
  const [email, setEmail] = useState("")
  const [user, loading] = useAuthState(auth)
 
  useEffect(() => {
    if (loading) return
    if (user) redirect("/dashboard")
  }, [user, loading])

  return (
    <div className="reset">
      <div className="reset_container">
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordReset(email)}
        >
                    Send password reset email
        </button>
        <div>Don&apos;t have an account? <Link to="/register">Register</Link>{" "} now.
        </div>
      </div>
    </div>
  )
}

export default Reset
