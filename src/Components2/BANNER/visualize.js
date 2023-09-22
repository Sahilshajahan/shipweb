  import React, { useEffect, useState } from 'react';
  import { Line } from 'react-chartjs-2';
  import Chart from 'chart.js/auto';
  import Slider from './slider';
  import ReactSlider from "react-slider";
  import './slider.css'
 

function Visualize({lineChart, shipTileLayers}) {
  const [shipCount, setShipCount] = useState(null);  
  const [resultDate, setResultDate] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  // const [density,setDenstity]=useState(null);

  console.log('linechart_dates',lineChart['datasets'][0]['data'][0]);
  console.log('linechart_data',lineChart.labels);
  const datelength = lineChart.labels.length;

let chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: 'white', // Change the color of the legend labels
      },
    },
  },
    scales: {
      x: {
        ticks: {
          color: 'white', 
        },
        grid: {
          color: 'gray', 
        },
      },
      y: {
        ticks: {
          color: 'white', 
        },
        grid: {
          color: 'white', 
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const clickedIndex = elements[0].index;
        const clickedDate = lineChart.labels[clickedIndex];
        const clickedCount = lineChart.datasets[0].data[clickedIndex];
        
        // Update the input fields with the clicked date and count
        setSliderValue(clickedIndex);
        setShipCount(clickedCount);
        setResultDate(clickedDate);
      }
    },
  };

  useEffect(()=>{
    sliderOnChangefn(sliderValue);
  }, [sliderValue]);

  const sliderOnChangefn = (index) =>{
    if (shipTileLayers){
      shipTileLayers.forEach((item, idx)=>{
        if (idx===index) item.setVisible(true)
        else item.setVisible(false)
      })
    }
    if (lineChart){
      setShipCount(lineChart.datasets[0].data[index])
      setResultDate(lineChart.labels[index])
      // setDenstity(lineChart.datasets[0].data[index] /(22/7) * 10*10)
    }
  };

    return (
      <div className='visualise'>
        <div className='shpcnt'>
          <label>Ship Count :</label>
          <input type='text' id='shipCount' value={shipCount} readOnly/></div>
          <div className='shpden'><label>Ship Density :</label>
          <input type='text' id='spdensity' value={`${(shipCount/(22/7*10*10)).toFixed(2)} per km` } readOnly/></div>
          <div className='shpdate'><label>Result Date :</label>
          <input type='text' id='rsltdate' value={resultDate} readOnly/></div>
          <h1 className='description'><u>Interactive Image slider and line graph</u></h1>

          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            markClassName="example-mark"
            marks={1}
            min={0}
            max={lineChart.labels.length-1}
            onChange={setSliderValue}
            value = {sliderValue}
          />
          <div className='linechart'>
              <Line data={lineChart}
            options={chartOptions}/>
           </div>
        
      </div>
    );
  }

  export default Visualize;