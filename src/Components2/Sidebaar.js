import React, {useState} from 'react';
import "./Sidebar.css";
import { MdLocalShipping, MdOpacity, MdBeachAccess, MdNaturePeople } from 'react-icons/md';
import { FaShip,FaUmbrellaBeach,FaWater,FaTree } from 'react-icons/fa';


function Sidebaar({ onShipDetectionClick, onOilSpillDetectionClick,onShoreLineDetectionClick, onMangroveDetectionClick }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
      <div className='side_icon'>
       <div class="logo-details">
         <span class = "logo_name">Geocoast</span>
       </div>
        
       <ul class= "links">
        <li>
          <a href="#" onClick={onShipDetectionClick}>
          <i class="fa-sharp fa-solid fa-ship"onMouseEnter={() => setHoveredItem('Ship detection')}
              onMouseLeave={() => setHoveredItem(null)}></i>
            <span>{hoveredItem === 'Ship detection' ? 'Ship detection' : null}</span>
          </a>
        </li>
        <li>
          <a href="#"onClick={onOilSpillDetectionClick}>
            <i class="fa-solid fa-droplet"onMouseEnter={() => setHoveredItem('Oil Spill detection')}
              onMouseLeave={() => setHoveredItem(null)}></i>
            <span >{hoveredItem === 'Oil Spill detection' ? 'Oil Spill detection' : null}</span>
          </a> 
       </li>
        <li>
        <a href="#"onClick={onShoreLineDetectionClick}>
        <i class="fa-solid fa-bacon"onMouseEnter={() => setHoveredItem('Shoreline detection')}
              onMouseLeave={() => setHoveredItem(null)}></i>
           <span >{hoveredItem === 'Shoreline detection' ? 'Shoreline detection' : null}</span>
          </a> 
        </li>
        <li>
         <a href="#"onClick={onMangroveDetectionClick}>
         <i class="fa-solid fa-seedling"onMouseEnter={() => setHoveredItem('Mangrove detection')}
              onMouseLeave={() => setHoveredItem(null)}></i>
            <span >{hoveredItem === 'Mangrove detection' ? 'Mangrove detection' : null}</span>
          </a> 
        </li>
        <li>
        <a href="#" onClick={onMangroveDetectionClick}>
        <i class="fa-solid fa-droplet"onMouseEnter={() => setHoveredItem('Bathemetry detection')}
              onMouseLeave={() => setHoveredItem(null)}></i>
            <span className='hide'>{hoveredItem === 'Bathemetry detection' ? 'Bathemetry detection' : null}</span>
          </a>
        </li>
        
       </ul>
       
       </div>
  )
}

export default Sidebaar