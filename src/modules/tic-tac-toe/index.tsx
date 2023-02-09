import React, { useEffect } from "react" 
import Game from "./Game"
import "./styles.css"

const TicTacToe = () => {
  useEffect(() => {
    document.title = "Tic tac toe"
  }, [])
  return <div data-theme="wireframe"><Game /></div>
}
export default TicTacToe