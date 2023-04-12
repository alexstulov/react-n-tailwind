import React from "react"

const ErrorThrower = () => {
  throw new Error("test it")
  return <></>
}

export default ErrorThrower