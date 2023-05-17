import React, {useState, useContext }from 'react'
import NavBar from './Components2/NavBar.js'
import './App.css'
import Banner from './Components2/BANNER/Banner.js'
import OpenLayersMap from './Components2/BANNER/Main.js'
// import { useState } from 'react'
import Draw from 'ol/interaction/Draw.js';
import drawcontext from './Components2/context.js'

function App() {
  const [mapObject,setMapObject]= useState(null);
  const [source,setVectorSource]= useState(null);
  const [loading, setLoading] = useState(false);
  // const {shipUrl} = useContext(drawcontext);


  function setaddInteraction(draw) {
    if (draw){
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
  return (
    <drawcontext.Provider value={{mapObject,setMapObject, source, setVectorSource}}>
    <div className="App">
    {loading && <div className="loading-overlay">Loading...</div>}
        <NavBar /> 
        <Banner drawToolControl={setaddInteraction}/>
        <OpenLayersMap />
    </div>
    </drawcontext.Provider>
  )
}
export default App
