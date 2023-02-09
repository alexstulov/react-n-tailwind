import React, { MouseEventHandler } from "react" 
type Val = string | null
type SquareT = {
  onClick: MouseEventHandler<HTMLButtonElement>,
  value: Val, 
  isWinner: boolean,
  isFinished: boolean
}

const Square = (props: SquareT) => (
  <button className={`w-full h-full rounded-none btn ${props.value === " " ? "btn-primary" : "btn-disabled"} ${props.isFinished ? "btn-disabled" : ""} text-9xl ${ props.isFinished && !props.isWinner ? " bg-black" : ""}`}
    onClick={props.onClick}> 
    {props.value}   
  </button>    
)

export default Square




