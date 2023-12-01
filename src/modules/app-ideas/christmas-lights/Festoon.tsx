import React from "react"
import { State } from "./types";

const Festoon = ({state}: {state: State}) => {
  const bulbs = state.bulbsSettings.map((settings, index) => {
    const [size, color] = settings
    return (<div key={index} 
      className={`w-5 h-5 rounded-full bulb-color-${color}`}
      style={state.blinking ? {
        width: size,
        height: size,
        animationName: `filter-animation-${color}`,
        animationDuration: `${state.blinkInterval}s`,
        animationDelay: `${index*state.blinkInterval/100*15}s`,
        animationIterationCount: "infinite"
      } : {
        width: size,
        height: size
      }}></div>)
  });
  
  return <>{[...Array(state.rowsAmount)].map((_, index) => {
    return (<div key={index} className="flex flex-row justify-center items-center gap-5">
      {bulbs}
    </div>)
  })}</>
};

export {Festoon}