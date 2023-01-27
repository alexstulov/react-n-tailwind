import React from "react"
import AvatarC from "./Avatar"

const Message = (props: {
    name: string
    photoUrl: string
    sender: boolean
    children?: any
}) => {
  const { name, photoUrl, sender, children } = props
  return (
    <div className="message">
      <div
        style={{
          display: "flex",
          flexDirection: sender ? "row-reverse" : "row",
        }}
      >
        <div className="mt-1">
          <AvatarC src={photoUrl} />
        </div>
        {!sender && <span>{name}</span>}
        <div
          className={
            sender
              ? "bg-green-800 text-black w-3/4"
              : "bg-gray-700 text-black w-3/4"
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Message
