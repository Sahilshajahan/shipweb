import React, { useState, useContext } from 'react';
import './Banner.css';
import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from './date';
import './date.css';
import './visualize.css';
import LocationDropdown from './droplist'; 
import drawcontext from '../context';
import {fromLonLat} from 'ol/proj.js';
import Visualize from './visualize';
import { getDateString } from './run';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';

function Banner(props) {
  const [showDetails, setShowDetails] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [smallNav,setSmallNav]=useState('Discover');
  const {mapObject} = useContext(drawcontext);
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading,setloading] = useState(false);
  const [shipCount, setShipCount] = useState(null);  
  const [resultDate, setResultDate] = useState(null); 
  const [showVisualize, setShowVisualize] = useState(false);
  const [resultLayer, setResultLayer] = useState(null);
  const [density,setDenstity]=useState(null);
  

const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const drawBtnHandler = () => {
    const drawValue = props.drawToolControl();
    drawValue.on('drawend', (event) => {
      const geometry = event.feature.getGeometry();
      const [lon, lat] = geometry.getCoordinates();
      setCoordinates({ lon, lat });
    });
  };

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

  const clearLayer=()=>{
    if(resultLayer){
      mapObject.removeLayer(resultLayer);
    }
    else{
      // console.log("noResultLayer");
    }
  };

  function handleRunCLick(props){
    
    setloading(true);

    console.log(`Start Date: ${getDateString(props.startDate,"YYYY-mm-dd")}, End Date: ${getDateString(props.endDate,"YYYY-mm-dd")}`);
    console.log('Selected coordinates:', selectedLocation);
    const fstartDate=getDateString(props.startDate,"YYYY-mm-dd");
    const fendDate = getDateString(props.endDate,"YYYY-mm-dd");
    const locationCoordinate = selectedLocation;
    console.log(fstartDate)
    let queryJson = {
      "data":{
        "aoi" : {
          "type":"FeatureCollection",
          "features":[{
            "type":"Feature",
            "geometry":{
              "type":"Point",
              "coordinates": locationCoordinate
            },
            "properties":{"name":"user_aoi"},
          }]
        },
        "dates":{
          "from_date":fstartDate,
          "to_date" : fendDate,
        }
      }
      
    }
    console.log('query',queryJson)

    let queryUrl= "http://127.0.0.1:3013/ship";
    fetch(queryUrl,{method: "POST",body:JSON.stringify(queryJson)})
    .then(resp => {
      console.log(resp);
      return resp.json();
      
    })
    .then(myJson => {
      const ship_count = myJson.data.ship_count;
      const result_date = myJson.data.Date;
      const ship_url = myJson.data.ship_url;
      const ship_density = myJson.data.Density;
      // ship_count = "10";
      setShipCount(ship_count);
      setResultDate(result_date);
      setDenstity(ship_density);

      setloading(false);
      setShowVisualize(true);
      setSmallNav('Visualize');
      clearLayer();
      const resultTileLayer = new TileLayer({
        source: new XYZ({
          attributions:
            'Tiles © <a href="https://earthengine.google.com/">Google Earth Engine</a>',
          url:ship_url,
        }),
        title:"shipLayer"
      });

      mapObject.addLayer(resultTileLayer);
      setResultLayer(resultTileLayer);
    })
    .catch(error => {
      setloading(false);
      console.error(error);
    });
};
/////////////////////////

////////////////////////
  function  CallBackStartDate(startDate)
  {
    setStartDate(startDate);
    console.log("startDate",startDate);
  }
  function CallBackEndDate(endDate)
  {
    setEndDate(endDate);
    console.log("endDate",endDate);
  }

  function callBackLocation(center)
  {
    setSelectedLocation(center);
    // console.log("location",center);
  }



  return (
    <div className={`side_banner ${showDetails ? 'minimized' : ''}`}>
      <button className="BannerToggleButton" onClick={handleToggleDetails}>
        {showDetails ? <i className="fas fa-bars"></i> : <i className="fas fa-times"></i>}
      </button>
      {!showDetails && (
        <div className='content'>
          <div className="BannerHeading">
            <h4><center>SHIP DETECTION</center></h4>
          </div>
          <div className="BannerTabs">
            <ul>
              <li className="active" onClick={()=>handleSmallNav('Discover')}>Discover</li>
              <li onClick={()=>handleSmallNav('Visualize')}>Visualize </li>
            </ul>
          </div>
          
          { smallNav==='Discover' ?
          
          <div className='discover'>
            <DateSelector  handleCallBackStart={CallBackStartDate} startDate={startDate} endDate={endDate} handlCallBackEnd={CallBackEndDate}/>
            <LocationDropdown onLocationChange={handleLocationChange} onSelectedLocationChange={callBackLocation}/>

            <div className='lat-long-container'>
              <label>Latitude:</label>
              <input type='number' step="0.01" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              <label>Longitude:</label>
              <input type='number' step="0.01" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </div>
           
            <button className="latlong-btn" onClick={drawBtnHandler}>Select Coordinates</button>
            <button className='undo'>Undo</button>
            <button className='reset'>Reset</button>
            
            {coordinates && (
              <div>
                <p>Latitude: {coordinates.lat.toFixed(2)}</p>
                <p>Longitude: {coordinates.lon.toFixed(2)}</p>
              </div>
            )}

            {loading ? 
          <div>
         <img className="loding" src="https://cdn.dribbble.com/users/121337/screenshots/1024835/loading2.gif" alt="" />
          </div>: null}

            <div><button className='run' onClick={()=>handleRunCLick({startDate:startDate,endDate:endDate,selectedLocation:selectedLocation})}>RUN</button></div>

          
        </div> 
        
        :(showVisualize && smallNav==='Visualize')?<Visualize shipCount={shipCount} ResultDate = {resultDate} shipDensity={density}/>:null
        }
         
        </div>
      )}
   
    </div>
  );
}

export default Banner;


