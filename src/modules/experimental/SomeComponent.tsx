import React from "react"

export class SomeComponent extends React.Component {
  constructor(props: object) {
    super(props)
    this.state = () => ({arr: [0,1,2]})
  }

  handleClick (id: number) {
    console.log(id)
  }

  clicker() {this.setState({arr: [2,3,1]})}

  render() {
    console.log(this.state)
    return (
      <button className="btn btn-primary" onClick={this.clicker.bind(this)} >click</button>
    )
  }
}