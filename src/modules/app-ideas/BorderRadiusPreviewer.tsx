import React, { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Corner, setCorner } from "./slices/borderRadiusPreviewerSlice"
import { StateT } from "./store"

type RadiusInputPropsT = {
  handleSwitchUnit: () => void,
  unit: string,
  corner: Corner
}
const RadiusInput = ({handleSwitchUnit, unit, corner}: RadiusInputPropsT) => {
  const dispatch = useDispatch()
  const all = useSelector((state: StateT) => state.borderRadiusPreviewer[corner])
  return <div className="form-control">
    <label className="label" htmlFor={corner}><span className="label-text">{corner}</span></label>
    <div className="input-group">
      <input type="text" name={corner} className="input input-bordered input-primary" onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setCorner({corner, value: e.target.value}))} value={all} />
      <button className="btn" onClick={() => handleSwitchUnit()}>{unit}</button>
    </div>
  </div>
}

const BorderRadiusPreviewer = () => {
  const [unit, switchUnit] = useState("px")
  const handleSwitchUnit = () => {
    switch (unit) {
    case "px":
      switchUnit("%")
      break;
    case "%":
      switchUnit("em")
      break;
    default:
      switchUnit("px")
      break;
    }
  }
  const all = useSelector((state: StateT) => state.borderRadiusPreviewer)
  const brConfig = `${all.topLeft || 0}${unit} ${all.topRight || 0}${unit} ${all.bottomLeft || 0}${unit} ${all.bottomRight || 0}${unit}`

  return <div className="flex flex-col mt-4">
    <div className="flex flex-col md:flex-row pb-4">
      <div className="flex flex-col w-full pr-4 md:w-auto pb-4 md:pb-0">
        <div className="flex flex-col md:flex-row gap-4">
          <RadiusInput handleSwitchUnit={handleSwitchUnit} unit={unit} corner={Corner.topLeft} />
          <RadiusInput handleSwitchUnit={handleSwitchUnit} unit={unit} corner={Corner.topRight} />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <RadiusInput handleSwitchUnit={handleSwitchUnit} unit={unit} corner={Corner.bottomLeft} />
          <RadiusInput handleSwitchUnit={handleSwitchUnit} unit={unit} corner={Corner.bottomRight} />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="border-8 border-primary w-full h-30" style={{borderRadius: brConfig}}></div>
      </div>
    </div>
    <div className="mockup-code p-4">
      <em style={{whiteSpace: "pre-wrap"}}>{`{
    ...
    border-radius: ${brConfig}
    ...
}`}</em>
    </div>
  </div>
}

export default BorderRadiusPreviewer