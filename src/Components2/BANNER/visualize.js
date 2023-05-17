import React, { useState } from 'react';

function Visualize({shipCount,ResultDate,shipDensity}) {
  console.log(shipCount);
  console.log (ResultDate);
  return (
    <div className='visualise'>
      <div className='shpcnt'>
        <label>Ship Count :</label>
        <input type='text' id='shipCount' value={shipCount} readOnly/></div>
        <div className='shpden'><label>Ship Density :</label>
        <input type='text' id='spdensity' value={`${shipDensity} per meter`} readOnly/></div>
        <div className='shpdate'><label>Result Date :</label>
        <input type='text' id='rsltdate' value={ResultDate} readOnly/></div>
        <h1 className='description'>This is the result tab</h1>
      
    </div>
  );
}

export default Visualize;