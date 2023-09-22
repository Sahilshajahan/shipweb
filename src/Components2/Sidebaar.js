import React from 'react'
import "./Sidebar.css";

function Sidebaar({ onShipDetectionClick, onOilSpillDetectionClick,onShoreLineDetectionClick, onMangroveDetectionClick }) {
  return (
      <div className='side_icon'>
        
          <div>
         <h2>Geocoast</h2> 
          </div>
        
       <ul class= "links">
        <li>
          <span className="material-symbol-outlined">S --  </span>
          <a href="#" onClick={onShipDetectionClick}>Ship detection</a>
        </li>
        <li>
          <span class="material-symbol-outlined">O -- </span>
          <a href="#" onClick={onOilSpillDetectionClick}>Oil spill detection</a>
        </li>
        <li>
          <span class="material-symbol-outlined">SL--</span>
          <a href="#"onClick={onShoreLineDetectionClick}>shoreline Analysis</a>
        </li>
        <li>
          <span class="material-symbol-outlined">M --</span>
          <a href="#"onClick={onMangroveDetectionClick}>Mangrove</a>
        </li>
        <li>
          <span class="material-symbol-outlined">B --</span>
          <a href="#">Bathemetry</a>
        </li>
        
       </ul>
       
       </div>
  )
}

export default Sidebaar