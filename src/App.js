import React, { useState, useContext } from 'react';
import NavBar from './Components2/NavBar.js';
import './App.css';
import Banner from './Components2/BANNER/Banner.js';
import OpenLayersMap from './Components2/BANNER/Main.js';
import Draw from 'ol/interaction/Draw.js';
import drawcontext from './Components2/context.js';
import Sidebaar from './Components2/Sidebaar.js';
import Banneroil from './Components2/BANNER/BannerOil.js';
import BannerShoreLine from './Components2/BANNER/BannerShoreLine.js';
import Mangrove from './Components2/BANNER/BannerMangrove.js';

function App() {

  const Clickedstyle={
    position:'fixed',
    height:'100%',
    width:'80%',
    left:'306px',
    // transition: 'all 0.3s ease-in'
  }
  const [mapObject, setMapObject] = useState(null);
  const [source, setVectorSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShipDetectionClicked, setIsShipDetectionClicked] = useState(false); // Track whether the link is clicked
  const [isOilSpillDetectionClicked, setIsOilSpillDetectionClicked] = useState(false); 
  const [isShoreLineDetectionClicked, setIsShoreLineDetectionClicked] = useState(false);
  const [isMangroveDtectionClicked, setIsMangroveDetectionClicked] = useState(false);

  
  function setaddInteraction(draw) {
    if (draw) {
      mapObject.removeInteraction(draw);
    }
    draw = new Draw({
      source: source,
      type: 'Point',
    });
    draw.on('drawend', (evt) => {
      // console.log(source);
      console.log(mapObject);
      console.log(source);
      // source.addFeature(evt.feature);
    });
    mapObject.addInteraction(draw);
    return draw;
  }

  // Function to handle the ship detection link click
  const handleShipDetectionClick = () => {
    setIsShipDetectionClicked(!isShipDetectionClicked);
    setIsOilSpillDetectionClicked(false);
    setIsShoreLineDetectionClicked(false)
    setIsMangroveDetectionClicked(false);
  };

  const handleOilSpillDetectionClick = () => {
    setIsOilSpillDetectionClicked(!isOilSpillDetectionClicked);
    setIsShipDetectionClicked(false); 
    setIsShoreLineDetectionClicked(false)
    setIsMangroveDetectionClicked(false);
  };

  const handleShoreLineDetectionClick = () => {
    setIsOilSpillDetectionClicked(false);
    setIsShipDetectionClicked(false); 
    setIsShoreLineDetectionClicked(!isShoreLineDetectionClicked)
    setIsMangroveDetectionClicked(false);
  };

  const handleMangroveDetectionClick = () => {
    setIsShipDetectionClicked(false);
    setIsOilSpillDetectionClicked(false);
    setIsShoreLineDetectionClicked(false);
    setIsMangroveDetectionClicked(!isMangroveDtectionClicked);
  };


  return (
    <div className = 'container'>
    <drawcontext.Provider value={{ mapObject, setMapObject, source, setVectorSource }}>
      <div className="App">
        {loading && <div className="loading-overlay">Loading...</div>}
        <NavBar />
        <Sidebaar onShipDetectionClick={handleShipDetectionClick} 
        onOilSpillDetectionClick={handleOilSpillDetectionClick}
        onShoreLineDetectionClick={handleShoreLineDetectionClick}
        onMangroveDetectionClick={handleMangroveDetectionClick}
        />
         {isShipDetectionClicked ? (
          <>
            <Banner drawToolControl={setaddInteraction} />
            <OpenLayersMap style={Clickedstyle} />
          </>
        ) : isOilSpillDetectionClicked ? (
          <>
            <Banneroil />
            <OpenLayersMap style={Clickedstyle} />
          </>
        ) : isShoreLineDetectionClicked ? (
          <>
            <BannerShoreLine />
            <OpenLayersMap style={Clickedstyle} />
          </>
          ): isMangroveDtectionClicked ? (
            <>
              <Mangrove />
              <OpenLayersMap style={Clickedstyle} />
            </>
            ):(
          <OpenLayersMap />
        )}
      </div>
    </drawcontext.Provider>
    </div>
  );
}
export default App;
