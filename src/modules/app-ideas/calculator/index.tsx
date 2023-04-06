import React from "react"

const Calculator = () => {
  const keyboard = [
    "C", "√", "%", "/",
    "7", "8", "9", "*", 
    "4", "5", "6", "-", 
    "1", "2", "3", "+", 
    ".", "0", "+/-", "="]

  return <div className="flex justify-center mt-4">
    <div className="calculator flex flex-col w-[25.5rem] min-w-[25.5rem] h-[16rem] border-4 border-pink-700 rounded-xl p-0.5">
      <div className="flex flex-row">
        <div className="w-[40.5%] h-[5.1rem] bg-blue-300 border-t-4 border-l-4 border-red-700 rounded-tl-lg"></div>
        <div className="w-[44.5%] h-full rounded-r-lg bg-red-700 py-1 pr-1" style={{clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)"}}>
          <div className="w-full h-full bg-blue-300" style={{clipPath: "polygon(0 0, 99% 0, 82% 100%, 0 101%)"}}></div>
        </div>
        <div className="w-[16%] bg-green-300 h-[5rem]">
            on/off radio
        </div>
      </div>
      <div className="flex row">
        <div className="w-[41%] h-[10.1rem] bg-red-700 px-1 pb-1 rounded-b-lg" style={{clipPath: "polygon(0 0, 100% 0, 64% 100%, 0 100%)"}}>
          <div className="w-full h-full bg-blue-300" style={{clipPath: "polygon(0 0, 100% 0, 63% 100%, 0 100%)"}}></div>
        </div>
        <div className="w-[59%] h-full bg-green-300">
          <div className="grid grid-cols-4 grid-rows-5 gap-1">
            {keyboard.map(item => <button key={item} type="button">{item}</button>)}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Calculator