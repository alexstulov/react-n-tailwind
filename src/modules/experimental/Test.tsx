import React from "react"

export class Test extends React.Component {
  handleClick (id: number) {
    console.log(id)
  }

  render() {
    return <button className="btn btn-secondary" onClick={this.handleClick.bind(this, 1)}>click</button>
  }
}