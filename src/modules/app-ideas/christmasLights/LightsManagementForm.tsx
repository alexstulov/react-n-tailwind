import React, { useState } from "react"
import { LightsAction, LightsActionType, State, colors, defaultSize } from "./types";

const LightsManagementForm = ({state, dispatch}: {state: State, dispatch: React.Dispatch<LightsAction>}) => {
  const blinkIntervalLimits = [1,5];
  const [selectedBulb, setSelectedBulb] = useState(0);
  
  const handleBlinkIntervalChange = (event: React.FormEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.currentTarget.value);
    if (typeof newValue !== "number" || Number.isNaN(newValue)) {
      newValue = 2;
    }
    if (newValue > blinkIntervalLimits[1]) {
      newValue = blinkIntervalLimits[1];
    } else if (newValue < blinkIntervalLimits[0]) {
      newValue = blinkIntervalLimits[0];
    }
    dispatch({
      type: LightsActionType.SET_BLINKING_INTERVAL,
      value: newValue
    });
  };
  
  const handleSelectBulbChange = (event: React.FormEvent<HTMLSelectElement>) => setSelectedBulb(parseInt(event?.currentTarget.value));
  const handleSelectColorChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const newSize = event.currentTarget.value;
    const newSettings = [...state.bulbsSettings];
    const currentBulb = newSettings[selectedBulb];
    const newValue = newSize ? newSize : currentBulb[1];
    newSettings[selectedBulb] = [currentBulb[0], newValue];
    dispatch({
      type: LightsActionType.SET_BULBS_SETTINGS,
      value: newSettings
    });
  }
  const handleSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newSize = event.currentTarget.value;
    const newSettings = [...state.bulbsSettings];
    const currentBulb = newSettings[selectedBulb];
    const newValue = newSize ? `${newSize}px` : defaultSize;
    newSettings[selectedBulb] = [newValue, currentBulb[1]];
    dispatch({
      type: LightsActionType.SET_BULBS_SETTINGS,
      value: newSettings
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
    <h1>Christmas Lights</h1>
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
        <span className="label-text">Blink interval ({blinkIntervalLimits[0]}-{blinkIntervalLimits[1]}), s.</span>
      </label>
      <input
        type="number"
        placeholder="Type here"
        name="blink-interval"
        className="input input-bordered w-full max-w-xs"
        value={state.blinkInterval}
        onChange={handleBlinkIntervalChange}
        min={blinkIntervalLimits[0]}
        max={blinkIntervalLimits[1]}
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
    <div className="container md:columns-3">
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
          <span className="label-text">Bulb size</span>
        </div>
        <input type="range" min="10" max="50" value={parseInt(state.bulbsSettings[selectedBulb][0])} className="range" onChange={handleSizeChange} />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Bulb color</span>
        </div>
        <select className="select select-bordered w-full max-w-xs" value={state.bulbsSettings[selectedBulb][1]} onChange={handleSelectColorChange}>
          {colors.map(optionColor => <option key={optionColor} value={optionColor}>{optionColor}</option>)}
        </select>
      </label>
    </div>
  </>;
};
  
export {LightsManagementForm}