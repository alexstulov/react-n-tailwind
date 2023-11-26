import React, { useState } from "react";
import "./styles.css";

const ChristmasLights = () => {
  const [blinking, setBlinking] = useState(true)

  const colors = ["red", "pink", "blue", "turquoise", "mint", "green", "orange"];
  const bulbs = colors.map((color, index) => (<div key={color} 
    className={`garland--bulb garland--bulb__color-${color}`}
    style={blinking ? {
      animation: `filter-animation-${color} 2s`,
      animationIterationCount: "infinite",
      animationDelay: `${index*0.3}s`
    } : {}}></div>))

  return <article className="prose christmas-lights">
    <h1>Christmas Lights</h1>
    <section className="garland">
      {bulbs}
    </section>
    <section className="prose management">
      <h2>Manage lights behavior</h2>
      <div className="form-control w-52">
        <label className="label cursor-pointer">
          <span className="label-text">On/Off blinking</span> 
          <input type="checkbox" className="toggle" checked={blinking} onChange={() => setBlinking(blinking => !blinking)} />
        </label>
      </div>
    </section>
  </article>
};

export { ChristmasLights }