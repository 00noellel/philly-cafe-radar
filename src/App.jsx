import './App.css';
import cafes from "./cafes";
  /* Imports the cafe list so App.jsx can use that data. */
import { useState, useEffect } from "react";
  /* useState: lets React remember which cafe is currently displayed (info that can change). */
  /* useEffect: lets you run something in response to the component being displayed. */
import CafeMap from "./CafeMap";

function App() { //describes React component
  const [currentCafe, setCurrentCafe] = useState(0);

  /* Move to the next cafe. */
  const nextCafe = () => {
    setCurrentCafe((current) => (current + 1) % cafes.length);
    /* When index = 3 (cafe #4), next = 0 since (3+1) % 4 = 0, goes back to first cafe */
  };

  /* Move to the previous cafe. */
  const previousCafe = () => {
    setCurrentCafe((current) => (current - 1 + cafes.length) % cafes.length);
    /* 0-1+4 = 3. 3%4 = 3. "Previous" on the first slide goes to the last slide. */
  };

  useEffect(() => { /* Tells React to run this setup after the component appears on the page. */ 
    const timer = setInterval(() => { /* Starts repeating timer, setInterval runs the function inside until timer is stopped. */ 
      setCurrentCafe((current) => (current + 1) % cafes.length);
      /* when the index reaches cafes.length (4), 4%4 = 0, returning to first cafe. */
    }, 4000); /* Closes repeating function. Sets interval: 4000 milliseconds = 4 seconds. */
    return () => clearInterval(timer); /* cleanup function so the older timer doesn't run unnecessarily. */
  }, []);

  return (  /* Describes what should appear on the screen. */
    <main>
      <header>
        <div className="header-left">
          <h1> 
            Philly
            <br />
            Cafe Radar
          </h1>   
          {/*h1: main heading*/}
          <p>THE PHILADELPHIA CAFE GUIDE</p>  
          {/*paragraph beneath it*/} 
        </div>
      </header>

      <section className="feature-panel">
      {/* In React, use className to give an element a
          name that CSS can target. Style this specific
          section without changing every section on the
          page 
      */}
        <button
          className="arrow left-arrow"
          onClick={previousCafe}
          type="button"
        />

        <div className="feature-visual">
          <img 
            src={cafes[currentCafe].image}
            alt={cafes[currentCafe].name}
          />
          <h2>{cafes[currentCafe].name}</h2>
        </div>

        <button
          className="arrow right-arrow"
          onClick={nextCafe}
          type="button"
          aria-label="Next cafe"
        />
      </section>

      {/* Two columns under panel */}
      <div className="discovery-layout">

        <div className="filter-panel">
          <section className="filter-section">
            <h2>What are you in the mood for?</h2>
            <p>Study | Catch up | Solo Date | Remote Work</p>
          </section>

          <section className="filter-section">
            <h2>Explore your options</h2>
            <p>Neighborhood | Price | Atmosphere</p>
          </section>

          <button className="find-cafe-button" type="button">
            Find my cafe
          </button>
        </div>

        {/* Map placeholder, right column */}
        <div className="map-panel">
          <CafeMap />
        </div>

      </div>
    </main>
  );
}

export default App; /* Makes component available to the rest of the project. */ 