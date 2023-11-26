import React from "react";
import "./styles.css";

const ChristmasLights = () => {
  const colors = ["red", "pink", "blue", "turquoise", "mint", "green", "orange"];
  const bulbs = colors.map((color, index) => (<div key={color} 
    className={`garland--bulb garland--bulb__color-${color}`}
    style={{
      animation: `filter-animation-${color} 2s`,
      animationIterationCount: "infinite",
      animationDelay: `${index*0.3}s`
    }}></div>))

  return <article className="christmas-lights">
    <h1>Christmas Lights</h1>
    <section className="garland">
      {bulbs}
    </section>
  </article>
};

export { ChristmasLights }