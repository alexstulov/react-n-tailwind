import React, { ChangeEvent, useState } from "react"

const b2d = (val: number, order: number) => val * Math.pow(2,order)

const Bin2Dec = () => {
  const [binary, setBinary] = useState("")
  const [decimal, setDecimal] = useState("")
  const [hasNonDigit, setHasNonDigit] = useState(false)
  const binaryInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const bin = e.target.value
    setBinary(bin)
    let dec = 0
    for (let i = 0; i < bin.length; i++) {
      dec += b2d(bin[i] === "0" ? 0 : 1, bin.length-i-1)
    }
    setHasNonDigit(/\D/.test(bin))

    setDecimal(dec.toString())
  }
  return <div className="m-4">
    <input type="text" className="input input-bordered w-1/2 max-w-xs mr-4" name="binary" onChange={binaryInputHandler} value={binary} />
    <input type="text" className="input input-bordered w-1/2 max-w-xs" name="decimal" value={hasNonDigit ? "Numbers only": decimal} disabled />
  </div>
}

export default Bin2Dec
