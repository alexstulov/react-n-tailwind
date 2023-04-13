import React, { useCallback, useEffect, useRef, useState } from "react"
import useWindowSize from "../../helpers/useWindowSize"

class ComplexObject {
  constructor() {
    console.log("initialized")
  }
  check() {
    console.log("still here")
  }
}

const MyUseRef = () => {
  const [count, setCount] = useState(0)
  const [position, setPosition] = useState({x: 0, y: 0})
  const [lastKey, setLastKey] = useState("")
  const intRef = useRef(0)
  const intervalRef = useRef<null | number>(null)

  const firstInputRef = useRef<null | HTMLInputElement>(null)
  const secondInputRef = useRef<null | HTMLInputElement>(null)

  const windowRef = useRef(window)

  const playerRef = useRef<null | ComplexObject>(null);
  if (playerRef.current === null) {
    playerRef.current = new ComplexObject(); // only predictable/allowed case for current reset during re-render
  }

  const dimensions = useWindowSize();

  useEffect(() => {
    const interval = window.setInterval(() => {
      intRef.current = intRef.current+1
    //   console.log("intref.curr", intRef.current)
    }, 1000)
    intervalRef.current = interval
    console.log("once effect")
  }, [])

  const handleClick = () => {
    const theInterval = intervalRef.current
    // works only for production build 'cause of double useEffect call
    theInterval && clearInterval(theInterval)
    setCount(count => count+1)
  }

  const handleToggleFocus = () => {
    if (Math.random() > 0.5) {
      secondInputRef.current?.focus()
    } else {
      firstInputRef.current?.focus()
    }
  }

  useEffect(() => {
    const setFromEvent = (e: MouseEvent) => setPosition({x: e.clientX, y: e.clientY})
    windowRef.current.addEventListener("mousemove", setFromEvent)
    return () => {
      windowRef.current.removeEventListener("mousemove", setFromEvent)
    }
  }, [])

  const handleKeyClick= useCallback((e: globalThis.KeyboardEvent) => {
    setLastKey(e.key)
  }, [])
  
  useEffect(() => {
    document.addEventListener("keydown", e => handleKeyClick(e))
  }, [handleKeyClick])

  return <div>
    {/* <span>Value from ref not trigger re-render: {intRef.current}</span> -- not recomended to read/write while re-render */}
    <div>
      <span>Count: {count}</span>
    </div>
    <button className="btn btn-primary" onClick={handleClick}>Break interval</button>
    <div>
      <input type="text" ref={firstInputRef} />
      <input type="text" ref={secondInputRef} />
      <button className="btn btn-primary" onClick={handleToggleFocus}>Toggle focus</button>
    </div>
    <div>
      <span>Cursor position: ({position.x}, {position.y})</span>
    </div>
    <div>
      <span>Window dimensions from useLayoutEffect hook: ({dimensions[0]}, {dimensions[1]})</span>
    </div>
    <div>
      <span>Last key clicked: `{lastKey}`</span>
    </div>
  </div>
}


export default MyUseRef