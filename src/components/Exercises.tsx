import React, { useState, useCallback, useEffect, useRef } from "react"
// import axios from "axios"

class SimpleComponent extends React.Component {
  handleClick(id: number) {
    console.log(id)
  }

  render() {
    return <>
      <span>Choose any correct implementation</span>
      <button onClick={() => this.handleClick(1)}>Button</button>
      {/* <button onClick={this.handleClick(1)}>Button</button> */}
      {/* <button onClick={this.handleClick.bind(1)}>Button</button> */}
      <button onClick={this.handleClick.bind(this, 1)}>Button</button>
    </>
  }
}

class DeveloperTable extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      checking: false
    };
    this.renderProfile = this.renderProfile.bind(this);
  }

  renderProfile() {
    return (
      <div>Function called</div>
    )
  }

  render() {
    return (
      <div className="patient-container">
        {this.renderProfile()}
      </div>
    )
  }
}

const Message = () => {
  const [messageObj, setMessage] = useState({message: ""})
  const [position, setPosition] = useState({x: "", y: ""})

  useCallback(() => {
    const setFromEvent = (e: any) => setPosition({x: e.clientX, y: e.clientY});
    window.addEventListener("mousemove", setFromEvent)
    // return () => {
    //   window.removeEventListener("mousemove", setFromEvent)
    // }
  }, [])

  return (
    <div>
      <input type="text" value={messageObj.message} placeholder="Enter a message"
        onChange={e => {
          const newMessageObj = {message: e.target.value}
          setMessage(newMessageObj)
          // setMessage({message: e.target.value})
        }} />
      <p><strong>{messageObj.message}</strong></p>
      <p>Current position: {`${position.x}: ${position.y}`}</p>
    </div>
  )
}

// TODO: learn to run this code correctly
function AnotherComp() {
  const [data] = useState<any>({hits: []});

  // useLayoutEffect(async () => {
  //     const result = await axios("http://example.com/api/v1/search?query=react");
  //     setData({hits: result.data})
  //   })

  // useEffect(async () => {
  //   const result = await axios("http://example.com/api/v1/search?query=react");
  //   setData({result.data})
  // })

  return (<ul>
    {data.hits.map((item: any) => {
      <li key={item.objectID}> <a href={item.url}>{item.title}</a></li>
    })}
  </ul>)
}

function KeyPress() {
  const [userText, setUserText] = useState("")

  const handleEvents = useCallback((event: any) => {
    const { key, keyCode } = event;
    if (keyCode === 32 || (keyCode >= 65 && keyCode <= 90)) {
      setUserText(`${userText}${key}`);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEvents);
    return () => {window.addEventListener("keydown", handleEvents)}
  }, [handleEvents]);

  return (<div>
    <h1>Typing here:</h1>
    <blockquote>{userText}</blockquote>
  </div>)
}

// TODO: check if my solution is correct - no memory leakage and all best practices
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    height: 0,
    width: 0
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  }, [windowSize]);
  return windowSize;
}

const LoadingMCQ = () => {
  const [token] = useState(() => { // wow - you can initialize state from function
    let token = window.localStorage.getItem("access-token");
    return token || "default#-token#"
  })

  return <div>Token is {token}</div>
}

// const usePrevious = (value: any) =>{
//   const ref = useRef()
//   useEffect(() => {
//     ref.current = value;
//   })
//   return ref.current
// }
const PrevState = ({count}: {count:number}) => {
  const prevCountRef = useRef(count)
  // useEffect(() => {
  //   prevCountRef.current = count;
  // });
  // const prevCount = prevCountRef.current
  return <span>PrevProp: {prevCountRef.current}</span>
  
}

const Exercises = () => {
  const windowSize = useWindowSize()
  return <>
    <SimpleComponent />
    <DeveloperTable />
    <Message />
    <AnotherComp />
    <KeyPress />
    <LoadingMCQ />
    <PrevState count={1} />
    <PrevState count={2} />
    <PrevState count={3} />
    <div>Window size: {`${windowSize.height}: ${windowSize.width}`}</div>
  </>
}

export default Exercises