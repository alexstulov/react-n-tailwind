import React from "react"
import { Squares } from "./Game"
import Square from "./Square"
type BoardPropsT = {squares: Squares, winnerLine: number[], onClick: any}

class Board extends React.Component<BoardPropsT> {
  squares = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
  ]
  renderSquare(i: number) {
    return <Square 
      isWinner={this.props.winnerLine.includes(i)}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />
  }

  render() {
    return (
      <div>
        {this.squares.map((row, r) => <div key={r} className="board-row">{
          row.map((square, s) => <div key={s}>{this.renderSquare(square)}</div>)
        }</div>)}
      </div>
    )
  }
}


export default Board