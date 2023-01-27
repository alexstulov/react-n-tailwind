import React from "react"

const Avatar = (props: { src: string | null }) => {
  return <img className="avatar" src={props.src || ""} alt="avata" />
}

export default Avatar
