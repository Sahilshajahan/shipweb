import React from 'react';

import MapComponent from './Components2/MAP/Map';
import OpenLayersMap from './Components2/Main';

function App() {
  return (
    <div className="App">
      <MapComponent />
      <OpenLayersMap />
    </div>
  );
}

export default App;
////////////////////////////////////////////////////////////////////////////////
import React, { useState, useContext } from 'react';
import './Banner.css';
import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from './date';
import './date.css';
import LocationDropdown from './droplist'; 
import drawcontext from '../context';
import {fromLonLat} from 'ol/proj.js';
import Visualize from './visualize';

function Banner(props) {

  const [smallNav,setSmallNav]=useState('Discover');
  const {mapObject} = useContext(drawcontext);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const handleLocationChange=(location)=>{
    const { center, zoom } = location;
    const view = mapObject.getView();
    const newCenter = fromLonLat(center);
    view.animate({ center: newCenter, zoom: zoom });

  };
  const handleSmallNav=(navName)=>{
    setSmallNav(navName);
    console.log("navName",navName);
  };

  function handleRunCLick(){
    
  }

  return (
    <div className={`side_banner ${showDetails ? 'minimized' : ''}`}>
    
      {!showDetails && (
        <div className='content'>
          <div className="BannerHeading">
            <h4>Welcome to my website</h4>
          </div>
          <div className="BannerTabs">
            <ul>
              <li className="active" onClick={()=>handleSmallNav('Discover')}>Discover</li>
              <li onClick={()=>handleSmallNav('Visualize')}>Visualize </li>
            </ul>
          </div>
          
          { smallNav=='Discover' ?
          
          <div className='discover'>
            <DateSelector />
            <LocationDropdown onLocationChange={handleLocationChange} />

            <div><button className='run' onClick={handleRunCLick}>RUN</button></div>
        </div> 
        :<Visualize />
        }
       </div>
      )}
    </div>
  );
}

export default Banner;
