import React, { MouseEventHandler } from "react" 
type Val = string | null
type SquareT = {onClick: MouseEventHandler<HTMLButtonElement>, value: Val, isWinner: boolean}

const Square = (props: SquareT) => (
  <button className={`square ${ props.isWinner ? "winner" : ""}`}
    onClick={props.onClick}> 
    {props.value}   
  </button>    
)

export default Square




