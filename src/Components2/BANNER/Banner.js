import React from 'react'
import './Banner.css'
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from './date';
import './date.css'


function Banner(props) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  let drawValue;
  
  const drawBtnHandler = () =>{
    drawValue=props.drawToolControl(drawValue);
  };
  return (
    <div className={`side_banner ${showDetails ? 'minimized' : ''}`}>
        <button className="BannerToggleButton" onClick={handleToggleDetails}>
          {showDetails ? <i className="fas fa-bars"></i>  : <i className="fas fa-times"></i>}
        </button>
      {!showDetails && (
        <div className='content'>
          <div className="BannerHeading">
            <h4>Welcome to my website</h4>
          </div>
          <div className="BannerTabs">
            <ul>
              <li className="active">Discover</li>
              <li>Visualize</li>
            </ul>
          </div>
          <DateSelector />

          <button onClick={drawBtnHandler}>Select Coordinates</button> {/* Modified button */}
            <h1 className='description'> this is the place were the side bar displays</h1>
        </div>
      )}
      
     </div> 
    );
}

export default Banner
