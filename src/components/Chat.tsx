import React, { useEffect, useRef, useState } from "react"
// import {useAuth, useChat} from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, MessageT, useMessages } from "../firebase"

import SendIcon from "./SendIcon"
import Message from "./Message"

const Chat = () => {
  // return <>the chat</>
  const [user, loading, isLogin] = useAuthState(auth)
  const { messages, sendMessage } = useMessages()
  // const {messages, sendMessage } = useChat()
  // const { user, isLogin} = useAuth()
  const [message, setMessage] = useState("")
  const [msgLength, setMsgLength] = useState(messages.length)

  useEffect(() => {
    if (msgLength !== messages.length) {
      bottom.current?.scrollIntoView({
        behavior: "smooth",
      })
      setMsgLength(messages.length)
    }
  }, [messages])

  const bottom = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="container-sm mt-20">
        {loading && <div>loading...</div>}
        {!loading && !isLogin && <h2>Sign in to see the chat</h2>}
        {!loading && (
          <div className="mx-5">
            {messages.map((msg: MessageT) => {
              console.log(messages)
              return (
                <Message
                  key={msg.id}
                  name={msg.userName}
                  photoUrl={msg.userPhotoURL}
                  sender={msg.userId === user?.uid}
                >
                  {msg.text}
                </Message>
              )
            })}
          </div>
        )}
      </div>

      <div ref={bottom} style={{ float: "left", clear: "both" }} />

      <div className="bottom">
        <div className="container-sm">
          {user && (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                sendMessage(message)
                setMessage("")
              }}
            >
              <input
                onChange={(event) => {
                  setMessage(event.target.value)
                }}
                value={message}
                placeholder="Message"
                required
              />
              <button type="submit">
                <SendIcon />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default Chat
