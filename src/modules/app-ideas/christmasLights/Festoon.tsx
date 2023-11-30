import React from "react"
import { State } from "./types";

const Festoon = ({state}: {state: State}) => {
  const bulbs = state.bulbsSettings.map((settings, index) => {
    return (<div key={index} 
      className={`w-5 h-5 rounded-full bulb-color-${settings[1]}`}
      style={state.blinking ? {
        width: settings[0],
        height: settings[0],
        animationName: `filter-animation-${settings[1]}`,
        animationDuration: `${state.blinkInterval}s`,
        animationDelay: `${index*state.blinkInterval/100*15}s`,
        animationIterationCount: "infinite"
      } : {
        width: settings[0],
        height: settings[0]
      }}></div>)
  });
  
  return <>{[...Array(state.rowsAmount)].map((_, index) => {
    return (<div key={index} className="flex flex-row justify-center items-center gap-5">
      {bulbs}
    </div>)
  })}</>
};

export {Festoon}