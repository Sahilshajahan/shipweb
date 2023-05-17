import React, { useState } from 'react';
import './droplist.css';

const LocationDropdown = ({ onLocationChange,onSelectedLocationChange  }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

 

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);

    let center;
    switch (location) {
        case 'Vishakapatnam':
            center= [83.35057,17.6461]
            onLocationChange({center , zoom: 12 });
            break;
          case 'Mumbai':
            center= [
              72.85005338382491,
              18.849306999763883
            ]
            onLocationChange({ center, zoom: 10 });
            break;
          case 'Kochi':
            center= [
              76.15968473148116,
              9.942001444588598
            ]
            onLocationChange({center , zoom: 8 });
            break;
          case 'chennai':
            center= [80.2707, 13.0826]
            onLocationChange({ center, zoom: 10 });
            break;
          default:
        break;
    }
    onSelectedLocationChange(center);
    // console.log(center);
  };

  return (
    <div className="location-dropdown-container">
      <label htmlFor="location-dropdown">Select Location:</label>
      <select id="location-dropdown" value={selectedLocation} onChange={handleLocationChange}>
        <option value="">Select a location</option>
        <option value="Vishakapatnam">Vishakapatnam</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Kochi">Kochi</option>
        <option value="chennai">chennai</option>
      </select>
    </div>
  );
};

export default LocationDropdown;
