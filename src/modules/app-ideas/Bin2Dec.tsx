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
    <div className="form-control w-full mb-4">
      <label htmlFor="binary" className="label">Binary</label>
      <input type="text" className=" w-full input input-bordered" name="binary" id="binary" onChange={binaryInputHandler} value={binary} maxLength={1024} placeholder="Enter binary number here..." />
    </div>
    <div className="form-control w-full">
      <label htmlFor="binary" className="label">Decimal</label>
      <input type="text" className="w-full input input-bordered" name="decimal" value={hasNonDigit ? "Numbers only": binary === "" ? "" : decimal} disabled />
    </div>
    
    
  </div>
}

export default Bin2Dec
