import React from "react"
import LoadingMCQ from "./LoadMCQ"
import {SomeComponent} from "./SomeComponent"
import { Test } from "./Test"

const Experimental = () => {
  return <>
    <SomeComponent />
    <LoadingMCQ />
    <Test />
  </>
}

export default Experimental