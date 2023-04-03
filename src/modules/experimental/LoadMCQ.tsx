import React, {useState} from "react"

const LoadingMCQ = () => {
  const [token] = useState(() => {
    const token = window.localStorage.getItem("access-token")
    return token || "default#-token"
  })

  const [some] = useState(() => [1,2,3])
  console.log(some)

  return <div>Token in {token}</div>
}

export default LoadingMCQ