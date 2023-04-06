import React from "react"
import classNames from "classnames"
import img from "./img-noise-361x370.png"
import "./styles.css"

const Calculator = () => {
  const keyboard = [
    "C", "√", "%", "÷",
    "7", "8", "9", "X", 
    "4", "5", "6", "—", 
    "1", "2", "3", "+", 
    ".", "0", "+/-", "="]
  // daisyui don't see extended colors or variables for border
  return <div className="flex justify-center mt-4">
    <div className={"calculator relative flex flex-col w-[25.5rem] min-w-[25.5rem] h-[16rem] border-4 border-[#60433a] rounded-xl p-0.5"} style={{backgroundImage: `url(${img})`}}>
      <div className="absolute top-[17px] z-10 left-[25px] px-2 py-1 border-2 border-black rounded-xl bg-old-calc-brown">
        <div className="w-[150px] h-[48px] border-2 border-black rounded-md bg-old-calc-green overflow-hidden">
          <input type="text" className="input w-full text-2xl text-right" style={{backgroundColor: "#6c6847"}} value="123" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className={"w-[40.5%] h-[5.1rem] border-t-4 border-l-4 border-[#87817e] rounded-tl-lg"}></div>
        <div className="w-[44.5%] h-full rounded-r-lg bg-old-calc-grey py-1 pr-1 shadow-red-700" style={{clipPath: "polygon(0 0, 100% 0, 82% 100%, 0 100%)"}}>
          <div className="w-full h-full" style={{clipPath: "polygon(0 0, 99% 0, 82% 100%, 0 101%)",backgroundImage: `url(${img})`}}></div>
        </div>
        <div className="w-[16%] h-[5.1rem] text-center">
          <span className="text-[0.5rem]">УТ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Т</span><br/>
          <input type="checkbox" className="toggle bg-old-calc-red rounded-xl" style={{boxShadow: "rgb(51,48,0) 24px 0 0 2px inset, rgb(51,48,0) 0 0 0 2px inset"}} checked />
        </div>
      </div>
      <div className="flex row">
        <div className="w-[41%] h-[10.1rem] bg-old-calc-grey px-1 pb-1 rounded-b-lg" style={{clipPath: "polygon(0 0, 100% 0, 64% 100%, 0 100%)"}}>
          <div className="flex flex-col pt-5 w-full h-full" style={{clipPath: "polygon(0 0, 100% 0, 63% 100%, 0 100%)", backgroundImage: `url(${img})`}}>
            <div className="flex justify-center">
              <div className="grid grid-cols-3 grid-rows-5 gap-x-2 gap-y-0.5 text-2xl">
                <span className="sound-dot"></span>
                <span className="sound-dot">.</span>
                <span className="sound-dot"></span>

                <span className="sound-dot">.</span>
                <span className="sound-dot"></span>
                <span className="sound-dot">.</span>

                <span className="sound-dot"></span>
                <span className="sound-dot">.</span>
                <span className="sound-dot"></span>

                <span className="sound-dot">.</span>
                <span className="sound-dot"></span>
                <span className="sound-dot">.</span>

                <span className="sound-dot"></span>
                <span className="sound-dot">.</span>
                <span className="sound-dot"></span>
              </div>
            </div>
            <div className="pt-9 ml-3"><span className="text-md">электроника</span></div>
            <div className="ml-3"><span className="text-xl">МК 53</span></div>
          </div>
        </div>
        <div className="w-[59%] h-[10.1rem] p-[0.7rem] pr-14">
          <div className="grid grid-cols-4 grid-rows-5 gap-y-[14px] gap-x-[4px]">
            {keyboard.map(item => <button key={item} type="button" className={classNames("w-[27px] h-[16px] bg-old-calc-brown text-white p-0 m-0 rounded-sm", {["bg-old-calc-red"]: item==="C"})}>{item}</button>)}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default Calculator