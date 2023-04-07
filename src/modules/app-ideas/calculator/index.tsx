import React, { useState } from "react"
import classNames from "classnames"
import img from "./img-noise-361x370.png"
import "./styles.css"

const SoundDotsRow = ({isOdd = false}) => {
  return isOdd ? <><span className="sound-dot"></span>
    <span className="sound-dot">.</span>
    <span className="sound-dot"></span></> : <><span className="sound-dot">.</span>
    <span className="sound-dot"></span>
    <span className="sound-dot">.</span></>
}

const SoundDots = () => {
  const arr = [1,2,3,4,5]

  return <>{arr.map((index) => <SoundDotsRow key={index} isOdd={index % 2 !== 0} />)}</>
}

const Calculator = () => {
  const keyboard = [
    "C", "√", "%", "÷",
    "7", "8", "9", "x", 
    "4", "5", "6", "—", 
    "1", "2", "3", "+", 
    ".", "0", "+/-", "="]

  const [isOn, setIsOn] = useState(false)
  const [input, setInput] = useState("")
  const [, setResult] = useState(0)
  const [prevAction, setPrevAction] = useState("")

  const onButtonClick = (item: string) => {
    if (!isOn) {
      return;
    }

    if (parseInt(item)) {
      setInput(input => {
        if (input === "0" || prevAction ==="=") {
          return item
        }
        return input+item
      })
      return;
    }
    switch(item) {
    case "C":
      setInput("0")
      break;
    case "+":
    case "—":
    case "x":
    case "÷":
      setResult(result => {
        switch(prevAction) {
        case "+":
          return result + parseInt(input)
        case "—":
          return result - parseInt(input)
        case "x":
          return result * parseInt(input)
        case "÷":
          return result / parseInt(input)
        case "":
        case "=":
          return parseInt(input)
        }
        return result
      })
      setPrevAction(item)
      setInput("0")
      break;
    case "=":
      setResult(result => {
        let res = result;
        switch(prevAction) {
        case "+":
          res = result + parseInt(input)
          break;
        case "—":
          res = result - parseInt(input)
          break;
        case "x":
          res = result * parseInt(input)
          break;
        case "÷":
          res = result / parseInt(input)
          break;
        case "":
          res = parseInt(input)
          break;
        }
        setPrevAction("=")
        setInput(res.toString())
        return 0
      })
      break;
    default:
      console.warn("not processed yet")
    }
  }

  const onIsOnChange = () => {
    setIsOn(isOn => {
      setInput(isOn ? "" : "0")
      setResult(0)
      setPrevAction("")
      return !isOn
    })
  }

  // daisyui don't see extended colors or variables for border
  return <div className="flex justify-center mt-4">
    <div className={"calculator relative flex flex-col w-[25.5rem] min-w-[25.5rem] h-[16rem] border-4 border-[#60433a] rounded-xl p-0.5"} style={{backgroundImage: `url(${img})`}}>
      <div className="absolute top-[17px] z-10 left-[25px] px-2 py-1 border-2 border-black rounded-xl bg-old-calc-brown">
        <div className="w-[150px] h-[48px] border-2 border-black rounded-md bg-old-calc-green overflow-hidden">
          <input type="text" className="input w-full text-2xl text-right" style={{backgroundColor: "#6c6847", cursor: "default"}} value={input} readOnly />
        </div>
      </div>
      <div className="flex flex-row">
        <div className={"w-[40.5%] h-[5.1rem] border-t-4 border-l-4 border-[#87817e] rounded-tl-lg"}></div>
        <div className="w-[44.5%] h-full rounded-r-lg bg-old-calc-grey py-1 pr-1 shadow-red-700" style={{clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)"}}>
          <div className="w-full h-full" style={{clipPath: "polygon(0 0, 99% 0, 82% 100%, 0 101%)",backgroundImage: `url(${img})`}}></div>
        </div>
        <div className="w-[16%] h-[5.1rem] text-center">
          <span className="text-[0.5rem]">УТ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Т</span><br/>
          <label className="relative inline-block w-12 h-7 rounded-full">
            <input type="checkbox" className="peer opacity-0 w-0 h-0" checked={isOn} onChange={onIsOnChange} />
            <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-black rounded-full duration-300 
            before:content-[''] before:absolute before:w-5 before:h-5 before:bottom-1 before:left-1 before:rounded-full
                before:bg-old-calc-red before:duration-300 peer-checked:before:translate-x-5"></span>
          </label>
        </div>
      </div>
      <div className="flex row">
        <div className="w-[41%] h-[10.1rem] bg-old-calc-grey px-1 pb-1 rounded-b-lg" style={{clipPath: "polygon(0 0, 100% 0, 64% 100%, 0 100%)"}}>
          <div className="flex flex-col pt-5 w-full h-full" style={{clipPath: "polygon(0 0, 100% 0, 63% 100%, 0 100%)", backgroundImage: `url(${img})`}}>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 grid-rows-5 gap-x-2 gap-y-0.5 text-2xl">
                <SoundDots />
              </div>
            </div>
            <div className="pt-9 ml-3"><span className="text-md">электроника</span></div>
            <div className="ml-3"><span className="text-xl">МК 53</span></div>
          </div>
        </div>
        <div className="w-[59%] h-[10.1rem] p-[0.7rem] pr-14">
          <div className="grid grid-cols-4 grid-rows-5 gap-y-[14px] gap-x-[4px]">
            {keyboard.map(item => (
              <button key={item} 
                type="button" 
                className={classNames(
                  "w-[27px] h-[16px] bg-old-calc-brown text-white p-0 m-0 rounded-sm", 
                  {["bg-old-calc-red"]: item==="C"})}
                onClick={() => onButtonClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Calculator