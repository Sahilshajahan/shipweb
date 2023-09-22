import React, { useEffect,useState, useContext } from 'react';
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
  
  const [showVisualize, setShowVisualize] = useState(false);
  const [resultLayer, setResultLayer] = useState(null);
  const [feature,setFeature]=useState(null);

  const [chartData, setChartData] = useState({});

  

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
      resultLayer.forEach(item => {
        mapObject.removeLayer(item);
      });
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

    const dateArray = []
    const countArray = []
    const tileUrl = []
    // let queryUrl= "http://127.0.0.1:3013/ship";
    let queryUrl="http://127.0.0.1:3013/shipcll";
    fetch(queryUrl,{method: "POST",body:JSON.stringify(queryJson)})
    .then(resp => {
      console.log(resp);
      return resp.json();
      
    })
    .then(myJson => {
      if(myJson.data.length){
        myJson.data.forEach(item => {
          dateArray.push(item.date);
          countArray.push(item.count);
          const resultTileLayer = new TileLayer({
            source: new XYZ({
              attributions:
                'Tiles © <a href="https://earthengine.google.com/">Google Earth Engine</a>',
              url: item.tileUrl,
            }),
            title:"shipLayer",
            visible: false,
          });
          mapObject.addLayer(resultTileLayer);
          tileUrl.push(resultTileLayer);
        });


        
        setResultLayer(tileUrl);

        console.log('resultlayer',resultLayer)

        console.log(dateArray, countArray, tileUrl);
      }
      else{
        console.log('No s1 tiles available');
      }
      //{ const ship_feature = 
      // console.log("ship_url",ship_url)
      // ship_count = "10";
      // setShipCount(ship_count);
      // setResultDate(result_date);
      // setDenstity(ship_density);
    
      // const labels = dateArray;
      // const data = countArray;}
      setChartData({
        labels:dateArray,
        datasets: [
          {
            label:"ship count",
            data: countArray,
            fill:false,
            borderColor:'rgba(75,192,192,1)',
            font : {
              size:18,
              color:'red',
            },
            tension: 0.1,
          },
          
        ],
        backgroundColor: "rgba(255, 0, 0)",
      });
      
      setloading(false);
      setShowVisualize(true);
      setSmallNav('Visualize');
      clearLayer();
    })
    .catch(error => {
      setloading(false);
      console.error(error);
    });
};


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
    
    <div class='side_banner'>

      <div className='side_icon'>
        
          <div class= "earth-logo">
          
          <img className="earth-logo" src={require("../../Components2/BANNER/earth-logo.png")}  alt ="logo"></img>
          <h2>Geocoast</h2> 
          </div>
        
       <ul class= "links">
        <li>
          <span class="material-symbol-outlined">S --  </span>
          <a href="#">Ship detection</a>
        </li>
        <li>
          <span class="material-symbol-outlined">O -- </span>
          <a href="#">Oil spill detection</a>
        </li>
        <li>
          <span class="material-symbol-outlined">SL--</span>
          <a href="#">shoreline Analysis</a>
        </li>
        <li>
          <span class="material-symbol-outlined">M --</span>
          <a href="#">Mangrove</a>
        </li>
        <li>
          <span class="material-symbol-outlined">B --</span>
          <a href="#">Bathemetry</a>
        </li>
        
       </ul>
       
       </div>
    </div>
  );
}

export default Banner;


