import React from "react"
import { Squares } from "./Game"
import Square from "./Square"
type BoardPropsT = {squares: Squares, winnerLine: number[], onClick: (i: number) => void}

class Board extends React.Component<BoardPropsT> {
  squares = [
    0,1,2,
    3,4,5,
    6,7,8,
  ]
  renderSquare(i: number) {
    return <Square
      isFinished={!!this.props.winnerLine.length}
      isWinner={this.props.winnerLine.includes(i)}
      value={this.props.squares[i] || " "}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    return (
      <>
        {this.squares.map((square, s) => <div key={s} className="flex grow-0 shrink-1 basis-[calc(33%+2px)] border-black border-[10px] aspect-square">{this.renderSquare(square)}</div>)}
      </>
    )
  }
}


export default Board