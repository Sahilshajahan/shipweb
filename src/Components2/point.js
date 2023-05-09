import React from 'react';
import OpenLayersMap from './Main'; 

function Button() {
  return (
<OpenLayersMap>
      {({ selectCoordinates }) => (
        <button onClick={selectCoordinates}>Select Coordinate</button>
      )}
    </OpenLayersMap>  );
}

export default Button;
