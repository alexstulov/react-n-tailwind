import React from "react";
import "./styles.css";

const ChristmasLights = () => {
  const bulbs = ["red", "pink", "blue", "turquoise", "mint", "green", "orange"]
    .map(color => {

      return (<div key={color} 
        className={`garland--bulb garland--bulb__color-${color}`}
        style={{
          animation: `filter-animation-${color} 3s`,
          animationIterationCount: "infinite"
        }}></div>);
    })

  return <article className="christmas-lights">
    <h1>Christmas Lights</h1>
    <section className="garland">
      {bulbs}
    </section>
  </article>
};

export { ChristmasLights }