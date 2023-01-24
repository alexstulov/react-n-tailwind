import React from "react"
import Board from "./Board"
export type Squares = (string | null)[]
type StateT = {history: {
  squares: Squares, 
  coord: number[]}[], 
  stepNumber: number, 
  xIsNext: boolean, 
  movesOrder: "asc" | "desc",
  alertOnce: boolean
}

const getCoords = (i: number) => {
  switch(i) {
  case 0: return [1,1]
  case 1: return [1,2]
  case 2: return [1,3]
  case 3: return [2,1]
  case 4: return [2,2]
  case 5: return [2,3]
  case 6: return [3,1]
  case 7: return [3,2]
  case 8: return [3,3]
  default: return []
  }
}

class Game extends React.Component<any, StateT> {
  constructor(props: any) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        coord: []
      }],
      stepNumber: 0,
      xIsNext: true,
      movesOrder: "asc",
      alertOnce: false
    }
  }
  getSign = () => this.state.xIsNext ? "X" : "O"
  alertOnce = false

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const {winner} = calculateWinner(squares) || squares[i]
    
    if (winner || history.length === 10) {
      return
    }
    squares[i] = this.getSign()

    if (!winner && history.length === 9 && !this.alertOnce) {
      this.alertOnce = true
      setTimeout(() => {
        alert ("Draw happens!")
      }, 100);
    }

    this.setState(() => {
      const hist = history.concat([{squares, coord: getCoords(i)}])
      
      return {
        history: hist, 
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length
      }}
    )
  }

  handleOrderClick() {
    this.setState((prevState) => {
      return {
        ...prevState,
        movesOrder: prevState.movesOrder === "asc" ? "desc" : "asc"
      }
    })
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const {line, winner} = calculateWinner(current.squares)
    const moves = history.map((step, move) => {
      let desc = step.coord.length ? <>Go to move #{move}, ({step.coord[0]}, {step.coord[1]})`</> : <>Go to game start</>
      if (move === this.state.stepNumber) {
        desc = <strong>{desc}</strong>
      } 
      return (
        <li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>
      )
    })

    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getSign()}`

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} winnerLine={line} onClick={(i: number) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>Toggle order: <button onClick={() => this.handleOrderClick()}>toggle</button></div>
          <div>{this.state.movesOrder === "asc" ? moves : moves.reverse()}</div>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {line: lines[i], winner: squares[a]};
    }
  }
  return {line: [], winne: null};
}

export default Game