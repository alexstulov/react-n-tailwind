import React, { ChangeEvent, useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Corner, setCorner } from "./slices/borderRadiusPreviewerSlice"
import { StateT } from "./store"

type RadiusInputPropsT = {
  handleSwitchUnit: () => void,
  unit: string,
  corner: Corner
}
const copyToClipboard = (brConfig: string) => {
  navigator.clipboard.writeText(`border-radius: ${brConfig}`)
}

const RadiusInput = ({handleSwitchUnit, unit, corner}: RadiusInputPropsT) => {
  const dispatch = useDispatch()
  const all = useSelector((state: StateT) => state.borderRadiusPreviewer[corner])
  return <div className="form-control">
    <label className="label" htmlFor={corner}><span className="label-text">{corner}</span></label>
    <div className="input-group">
      <input type="number" name={corner} className="input input-bordered input-primary" onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setCorner({corner, value: e.target.value}))} value={all} />
      <button className="btn" onClick={() => handleSwitchUnit()}>{unit}</button>
    </div>
  </div>
}

const BorderRadiusPreviewer = () => {
  const [unit, switchUnit] = useState("px")
  const [showCopyIcon, setShowCopyIcon] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const handleSwitchUnit = useCallback(() => {
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
  }, [unit])

  const all = useSelector((state: StateT) => state.borderRadiusPreviewer)
  const brConfig = `${all.topLeft || 0}${unit} ${all.topRight || 0}${unit} ${all.bottomLeft || 0}${unit} ${all.bottomRight || 0}${unit}`

  const handleCopyClick = useCallback(() => {
    copyToClipboard(brConfig)
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000);
  }, [brConfig])

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
        <div className="border-8 border-primary w-full min-h-30 h-30" style={{borderRadius: brConfig}}></div>
      </div>
    </div>
    <div className="mockup-code p-4 relative" 
      onMouseOver={() => setShowCopyIcon(true)} 
      onFocus={() => setShowCopyIcon(true)} 
      onMouseOut={() => setShowCopyIcon(false)} 
      onBlur={() => setShowCopyIcon(false)}>
      <button className={`absolute top-2 left-2 ${!showCopyIcon ? "hidden" : ""}`} onClick={() => handleCopyClick()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
        </svg>
      </button>
      <em style={{whiteSpace: "pre-wrap"}}>{`{
    ...
    border-radius: ${brConfig}
    ...
}`}</em>
    </div>
    <div className={`toast toast-end transition-all ease delay-300 ${!showToast ? "hidden" : ""}`}>
      <div className="alert alert-info">
        <span>CSS rule copied to clipboard!</span>
      </div>
    </div>
  </div>
}

export default BorderRadiusPreviewer