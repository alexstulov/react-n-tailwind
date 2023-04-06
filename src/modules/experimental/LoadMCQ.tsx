import React, {useEffect, useState} from "react"

const LoadingMCQ = () => {
  const [token] = useState(() => {
    const token = window.localStorage.getItem("access-token")
    return token || "default#-token"
  })

  const [some] = useState(() => [1,2,3])
  console.log(some)

  const [n, setN] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setN(n => {
        if (n === 5) {
          clearInterval(interval)
          return n;
        }
        return n+1
      })
      return () => clearInterval(interval)
    }, 1000)
  }, [])

  useEffect(() => { 
    console.log("effect")
    return () => {
      console.log("clear effect")
    };
  }, [n])

  return <div>Token in {token}</div>
}

export default LoadingMCQ