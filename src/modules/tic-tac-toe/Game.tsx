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
    const {winner} = calculateWinner(squares)

    if (winner || squares[i] || history.length === 10) {
      return
    }

    squares[i] = this.getSign()

    if (!winner && history.length === 9 && !this.alertOnce) {
      this.alertOnce = true
      const {winner} = calculateWinner(squares)
      setTimeout(() => {
        if (!winner && history.length === 9) {
          alert ("Draw happens!")
        }
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
      let desc = step.coord.length ? <>#{move}, ({step.coord[0]}, {step.coord[1]})</> : <>Go to game start</>
      if (move === this.state.stepNumber) {
        desc = <strong>{desc}</strong>
      } 
      return (
        <li key={move} className="mb-3"><button className="btn btn-primary" onClick={() => this.jumpTo(move)}>{desc}</button></li>
      )
    })

    const status = winner ? `Winner: ${winner}` : `Next player: ${this.getSign()}`

    return (
      <div className="flex flex-col items-center prose-headings:text-[5rem]">
        <h1 className="mt-5 w-[600px] text-left">Tic tac toe</h1>
        <div className="mb-5 w-[600px] text-left text-xl">
          <span>{status}</span>
        </div>
        <div className="border-[20px] border-black">
          <div className="flex flex-wrap w-[600px]">
            <Board squares={current.squares} winnerLine={line} onClick={(i: number) => this.handleClick(i)}/>
          </div>
        </div>
        <div className="w-[600px]">

          <div className="my-5 w-[600px] text-left text-xl"><span>Steps chain: <button className="link" onClick={() => this.handleOrderClick()}>toggle {this.state.movesOrder === "asc" ? "▲" : "▼"}</button></span></div>
          <div className="breadcrumbs">
            <ul className="flex flex-wrap">{this.state.movesOrder === "asc" ? moves : moves.reverse()}</ul>
          </div>
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