import React, { useReducer } from "react";
import "./styles.css";
import { Festoon } from "./Festoon";
import { LightsManagementForm } from "./LightsManagementForm";
import { Colors, LightsAction, LightsActionType, State, defaultSize } from "./types";

const ChristmasLights = () => {
  const defaultState: State = {
    blinking: true,
    blinkInterval: 2,
    rowsAmount: 1,
    bulbsSettings: [
      [defaultSize, Colors.RED],
      [defaultSize, Colors.PINK],
      [defaultSize, Colors.BLUE],
      [defaultSize, Colors.TURQUOISE],
      [defaultSize, Colors.MINT],
      [defaultSize, Colors.GREEN],
      [defaultSize, Colors.YELLOW],
    ]
  }

  const [state, dispatch] = useReducer((state: State, action: LightsAction) => {
    switch(action.type) {
    case LightsActionType.TOGGLE_BLINKING:
      return {
        ...state,
        blinking: !state.blinking
      };
    case LightsActionType.SET_BLINKING_INTERVAL:
      return {
        ...state,
        blinkInterval: action.value
      };
    case LightsActionType.SET_ROWS_AMOUNT:
      return {
        ...state,
        rowsAmount: action.value
      };
    case LightsActionType.SET_BULBS_SETTINGS:
      return {
        ...state,
        bulbsSettings: action.value
      };
    default:
      return state;
    }
  }, defaultState)

  return <article className="p-5 w-full max-w-full h-full flex flex-col items-center gap-10 bg-primary md:flex-row">
    <section className="prose flex flex-col w-full md:min-width-half">
      <LightsManagementForm state={state} dispatch={dispatch} />
    </section>
    <section className="flex flex-col flex-1 content-center items-center gap-2.5 w-full h-full md:min-width-half">
      <Festoon state={state} />
    </section>
  </article>
};

export { ChristmasLights }