import React, { useState } from "react"
import { LightsAction, LightsActionType, State, colors } from "./types";

const LightsManagementForm = ({state, dispatch}: {state: State, dispatch: React.Dispatch<LightsAction>}) => {
  const [minBlinkInterval, maxBlinkInterval] = [1,5];
  const [selectedBulb, setSelectedBulb] = useState(0);
  
  const handleBlinkIntervalChange = (event: React.FormEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.currentTarget.value);
    if (typeof newValue !== "number" || Number.isNaN(newValue)) {
      newValue = state.blinkInterval;
    }
    if (newValue > maxBlinkInterval) {
      newValue = maxBlinkInterval;
    } else if (newValue < minBlinkInterval) {
      newValue = minBlinkInterval;
    }
    dispatch({
      type: LightsActionType.SET_BLINKING_INTERVAL,
      value: newValue
    });
  };
  
  const handleSelectBulbChange = (event: React.FormEvent<HTMLSelectElement>) => setSelectedBulb(parseInt(event?.currentTarget.value));
  const handleSelectColorChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const newColor = event.currentTarget.value;
    dispatch({
      type: LightsActionType.SET_BULB_COLOR,
      value: {bulbIndex: selectedBulb, color: newColor}
    });
  }
  const handleSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newSize = event.currentTarget.value;
    dispatch({
      type: LightsActionType.SET_BULB_SIZE,
      value: {bulbIndex: selectedBulb, size: newSize}
    });
  }
  const handleRowsAmountChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const newRowsAmount = event.currentTarget.value;
    dispatch({
      type: LightsActionType.SET_ROWS_AMOUNT,
      value: parseInt(newRowsAmount) ?? state.rowsAmount
    });
  }
  
  const handleBlinkingChange = () => {
    dispatch({
      type: LightsActionType.TOGGLE_BLINKING,
    })
  }
  
  return <>
    <h2>Manage lights behavior</h2>
    <div className="form-control w-full">
      <label className="label cursor-pointer w-52" htmlFor="toggle-blinking">
        <span className="label-text">On/Off blinking</span> 
        <input
          type="checkbox"
          className="toggle"
          name="toggle-blinking"
          checked={state.blinking}
          onChange={handleBlinkingChange}
        />
      </label>
    </div>
    <div className="form-control w-full">
      <label className="label" htmlFor="blink-interval">
        <span className="label-text">Blink interval ({minBlinkInterval}-{maxBlinkInterval}), s.</span>
      </label>
      <input
        type="number"
        name="blink-interval"
        className="input input-bordered w-full max-w-xs"
        value={state.blinkInterval}
        onChange={handleBlinkIntervalChange}
        min={minBlinkInterval}
        max={maxBlinkInterval}
      />
    </div>
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Set rows amount</span>
      </div>
      <select className="select select-bordered w-full max-w-xs" value={state.rowsAmount} onChange={handleRowsAmountChange}>
        {[...Array(7)].map((_, rowsAmountOption) => <option key={rowsAmountOption} value={rowsAmountOption}>{rowsAmountOption}</option>)}
      </select>
    </label>
    <div className="container border-2 border-solid border-secondary mt-2 p-2 max-w-xs md:columns-3 md:max-w-none">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Pick a bulb</span>
        </div>
        <select className="select select-bordered w-full max-w-xs" value={selectedBulb} onChange={handleSelectBulbChange}>
          {[...Array(7)].map((_,optionNumber) => <option key={optionNumber} value={optionNumber}>{optionNumber+1}</option>)}
        </select>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Bulb color</span>
        </div>
        <select className="select select-bordered w-full max-w-xs" value={state.bulbsSettings[selectedBulb][1]} onChange={handleSelectColorChange}>
          {colors.map(optionColor => <option key={optionColor} value={optionColor}>{optionColor}</option>)}
        </select>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Bulb size</span>
        </div>
        <input type="range" min="10" max="50" value={parseInt(state.bulbsSettings[selectedBulb][0])} className="range" onChange={handleSizeChange} />
      </label>
    </div>
  </>;
};
  
export {LightsManagementForm}