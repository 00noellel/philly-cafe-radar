import './App.css';
import cafes from "./cafes";
  // Imports the cafe list so App.jsx can use that data.
import { useState, useEffect } from "react";
  // useState: lets React remember which cafe is currently displayed (info that can change). 
  // useEffect: lets you run something in response to the component being displayed. 
import CafeMap from "./CafeMap";

function App() { // describes React component 
  // Tracks which cafe is currently in the discovery panel
  const [currentCafe, setCurrentCafe] = useState(0);

  // Stores the user's selected filter options
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedAtmosphere, setSelectedAtmosphere] = useState("");

  // Stores the cafe recommended by the filter search 
  const [recommendedCafe, setRecommendedCafe] = useState(null);
  const [message, setMessage] = useState("");

  // Move to the next cafe. 
  const nextCafe = () => {
    setCurrentCafe((current) => (current + 1) % cafes.length);
    // When index = 3 (cafe #4), next = 0 since (3+1) % 4 = 0, goes back to first cafe 
  };

  // Move to the previous cafe. 
  const previousCafe = () => {
    setCurrentCafe((current) => (current - 1 + cafes.length) % cafes.length);
    // 0-1+4 = 3. 3%4 = 3. "Previous" on the first slide goes to the last slide. 
  };

  useEffect(() => { // Tells React to run this setup after the component appears on the page. 
    const timer = setInterval(() => { // Starts repeating timer, setInterval runs the function inside until timer is stopped. 
      setCurrentCafe((current) => (current + 1) % cafes.length);
      // when the index reaches cafes.length (4), 4%4 = 0, returning to first cafe. 
    }, 4000); // Closes repeating function. Sets interval: 4000 milliseconds = 4 seconds. 
    
    return () => clearInterval(timer); // cleanup function so the older timer doesn't run unnecessarily. 
  }, []);

    // Find a cafe that macthes every filter the user selected 
    const findCafe = () => {
      const matches = cafes.filter((cafe) => {
        const matchesMood =
          !selectedMood || cafe.moods.includes(selectedMood);
        
        const matchesNeighborhood = 
          !selectedNeighborhood || cafe.neighborhood.includes(selectedNeighborhood);

        const matchesPrice =
          !selectedPrice || cafe.price === selectedPrice;
        
        const cafeAtmosphere = Array.isArray(cafe.atmosphere)
          ? cafe.atmosphere
          : [cafe.atmosphere];

        const matchesAtmosphere =
          !selectedAtmosphere || cafeAtmospheres.includes(selectedAtmosphere);

        return (
          matchesMood &&
          matchesNeighborhood &&
          matchesPrice &&
          matchesAtmosphere
        );
      });

      if (matches.length === 0) {
        setRecommendedCafe(null);
        setMessage("No exact match found. Try changing/removing a filter.");
        return;
      }

      // Recommend first cafe that matches all selections
      setRecommendedCafe(matches[0]);
      setMessage('We found a cafe for you: ${matches[0].name}!');
    };



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
            
            <div className="mood-options">
              {["Study", "Catch up", "Solo Date", "Remote Work"].map((mood) => (
                <button
                  key={mood}
                  type="button"
                  className={`mood-button ${
                    selectedMood === mood ? "selected" : ""
                  }`}
                  aria-pressed={selectedMood === mood}
                  onClick={() =>
                    setSelectedMood(selectedMood === mood ? "" : mood)
                  }
                >
                  {mood}
                </button>
              ))}
            </div>
          </section>

          <section className="filter-section">
            <h2>Explore your options</h2>

            <label htmlFor="neighborhood">Neighborhood</label>
            <select
              id="neighborhood"
              value={selectedNeighborhood}
              onChange={(event) => setSelectedNeighborhood(event.target.value)}
            >
              <option value="">Any neighborhood</option>
              {[...new Set(cafes.map((cafe) => cafe.neighborhood))].map(
                (neighborhood) => (
                  <option key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </option>
                )
              )}
            </select>

            <label htmlFor="price">Price</label>
            <select
              id="price"
              value={selectedPrice}
              onChange={(event) => setSelectedPrice(event.target.value)}
            >
              <option value="">Any price</option>
              {["$", "$$", "$$$"].map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>

            <label htmlFor="atmosphere">Atmosphere</label>
            <select
              id="atmosphere"
              value={selectedAtmosphere}
              onChange={(event) => setSelectedAtmosphere(event.target.value)}
            >
              <option value="">Any atmosphere</option>
              {["Cozy", "Social", "Quiet"].map((atmosphere) => (
                <option key={atmosphere} value={atmosphere}>
                  {atmosphere}
                </option>
              ))}
            </select>
          </section>

          <button
            className="find-cafe-button"
            type="button"
            onClick={findCafe}
          >
            Find my cafe
          </button>

          {message && (
            <p className="recommendation-message" role="status">
              {message}
            </p>
          )}

          {recommendedCafe && (
            <div className="recommendation-result">
              <h3>{recommendedCafe.name}</h3>
              <p>{recommendedCafe.neighborhood}</p>
              <p>
                {recommendedCafe.price} ·{" "}
                {(Array.isArray(recommendedCafe.atmosphere)
                  ? recommendedCafe.atmosphere
                  : [recommendedCafe.atmosphere]
                ).join(", ")}
              </p>
            </div>
          )}
        </div>

        {/* Right column: interactive map */}
        <div className="map-panel">
          <CafeMap recommendedCafe={recommendedCafe} />
        </div>
      </div>
    </main>
  );
}

export default App; /* Makes component available to the rest of the project. */ 