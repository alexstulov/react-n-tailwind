import React from "react"
import LoadingMCQ from "./LoadMCQ"
import {SomeComponent} from "./SomeComponent"
import { Test } from "./Test"
import ErrorBoundary from "../../components/ErrorBoundary"
import ErrorThrower from "./ErrorThrower"

const Experimental = () => {
  return <>
    <SomeComponent />
    <LoadingMCQ />
    <Test />
    <div>
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
      <ErrorBoundary>
        <div>
          <span>This button wont trigger ErrorBoundary, should be wrapped with try/catch</span>
          <button type="button" onClick={() => {
            throw new Error("test error boundary")
          }} className="btn btn-accent">trigger error</button>
        </div>
      </ErrorBoundary>
    </div>
  </>
}

export default Experimental