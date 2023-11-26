import React, { useState } from "react";
import "./styles.css";

const ChristmasLights = () => {
  const blinkIntervalLimits = [1,5];
  const [blinking, setBlinking] = useState(true)
  const [blinkInterval, setBlinkInterval] = useState(2);

  const colors = ["red", "pink", "blue", "turquoise", "mint", "green", "orange"];
  const bulbs = colors.map((color, index) => (<div key={color} 
    className={`garland--bulb garland--bulb__color-${color}`}
    style={blinking ? {
      animationName: `filter-animation-${color}`,
      animationDuration: `${blinkInterval}s`,
      animationDelay: `${index*blinkInterval/100*15}s`,
      animationIterationCount: "infinite"
    } : {}}></div>));
  
  const handleBlinkIntervalChange = (event: React.FormEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.currentTarget.value);
    if (typeof newValue !== "number" || Number.isNaN(newValue)) {
      newValue = 2;
    }
    if (newValue > 5) {
      newValue = 5;
    } else if (newValue < 1) {
      newValue = 1;
    }
    setBlinkInterval(newValue)
  };

  return <article className="prose christmas-lights">
    <h1>Christmas Lights</h1>
    <section className="garland">
      {bulbs}
    </section>
    <section className="prose management w-1/2">
      <h2>Manage lights behavior</h2>
      <div className="form-control w-full">
        <label className="label cursor-pointer w-52" htmlFor="toggle-blinking">
          <span className="label-text">On/Off blinking</span> 
          <input
            type="checkbox"
            className="toggle"
            name="toggle-blinking"
            checked={blinking}
            onChange={() => setBlinking(blinking => !blinking)}
          />
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="blink-interval">
          <span className="label-text">Blink interval ({blinkIntervalLimits[0]}-{blinkIntervalLimits[1]}), s.</span>
        </label>
        <input
          type="number"
          placeholder="Type here"
          name="blink-interval"
          className="input input-bordered w-full max-w-xs"
          value={blinkInterval}
          onChange={handleBlinkIntervalChange}
          min="1"
          max="5"
        />
      </div>
    </section>
  </article>
};

export { ChristmasLights }