import React, { useEffect, useState, useContext } from 'react';
import './Banner.css';
import 'react-datepicker/dist/react-datepicker.css';
import DateSelector from './date';
import './date.css';
import './visualize.css';
import LocationDropdown from './droplist';
import drawcontext from '../context';
import { fromLonLat } from 'ol/proj.js';
import Visualize from './visualize';
// import { getDateString } from './run';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';


function BannerShoreLine(props) {
  const [coordinates, setCoordinates] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [smallNav, setSmallNav] = useState('Discover');
  const { mapObject } = useContext(drawcontext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setloading] = useState(false);

  const [showVisualize, setShowVisualize] = useState(false);
  const [resultLayer, setResultLayer] = useState(null);
  const [feature, setFeature] = useState(null);

  const [chartData, setChartData] = useState({});

  const drawBtnHandler = () => {
    const drawValue = props.drawToolControl();
    drawValue.on('drawend', (event) => {
      const geometry = event.feature.getGeometry();
      const [lon, lat] = geometry.getCoordinates();
      setCoordinates({ lon, lat });
    });
  };

  const handleLocationChange = (location) => {
    const { center, zoom } = location;
    const view = mapObject.getView();
    const newCenter = fromLonLat(center);
    view.animate({ center: newCenter, zoom: zoom });
  };

  const handleSmallNav = (navName) => {
    setSmallNav(navName);
    console.log('navName', navName);
  };

  const clearLayer = () => {
    if (resultLayer) {
      resultLayer.forEach((item) => {
        mapObject.removeLayer(item);
      });
    } else {
    }
  };

  function handleRunCLick(props) {
    setloading(true);

    // console.log(`Start Date: ${getDateString(props.startDate, 'YYYY-mm-dd')}, End Date: ${getDateString(props.endDate, 'YYYY-mm-dd')}`);
    // console.log('Selected coordinates:', selectedLocation);
    // const fstartDate = getDateString(props.startDate, 'YYYY-mm-dd');
    // const fendDate = getDateString(props.endDate, 'YYYY-mm-dd');
    // const locationCoordinate = selectedLocation;
    // console.log(fstartDate);
    let queryJson = {
      data: {
        aoi: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [
                            [
                                [
                                    106.80219696052866,
                                    10.39796631362065
                                ],
                                [
                                    106.756878555931,
                                    10.410122671299996
                                ],
                                [
                                    106.73078613912003,
                                    10.284484218223586
                                ],
                                [
                                    106.79121068193291,
                                    10.251377568065578
                                ],
                                [
                                    106.80219696052866,
                                    10.39796631362065
                                ]
                            ]
                        ],
              },
              properties: { name: 'user_aoi' },
            },
          ],
        },
      },
    };
    console.log('query', queryJson);

    // const dateArray = [];
    // const countArray = [];
    const layerData = [];
    let queryUrl = 'http://127.0.0.1:3013/shoreline';
    fetch(queryUrl, { method: 'POST', body: JSON.stringify(queryJson) })
      .then((resp) => {
        console.log(resp);
        return resp.json();
        
      })
      .then((myJson) => {
        console.log(myJson)
        if (myJson.data.length) {
          myJson.data.forEach((item) => {
            // dateArray.push(item.date);
            // countArray.push(item.count);
            const resultTileLayer = new TileLayer({
              source: new XYZ({
                attributions: 'Tiles © <a href="https://earthengine.google.com/">Google Earth Engine</a>',
                url: item.tileUrl,
              }),
              title: 'shoreline - '+item.year,
              visible: true,
            });
            mapObject.addLayer(resultTileLayer);
            layerData.push({shorelineTile:resultTileLayer, title:"Shore Line - "+item.year, color:item.color});
           
          });

          // console.log('resultlayer', resultLayer);
          console.log('layerData',layerData)
          // console.log(dateArray, countArray, tileUrl);
        } else {
          console.log('No tiles available');
        }

        setloading(false);
        setShowVisualize(true);
        setSmallNav('Visualize');
        clearLayer();
      })
      .catch((error) => {
        setloading(false);
        console.error(error);
      });
  }

  // function CallBackStartDate(startDate) {
  //   setStartDate(startDate);
  //   console.log('startDate', startDate);
  // }
  // function CallBackEndDate(endDate) {
  //   setEndDate(endDate);
  //   console.log('endDate', endDate);
  // }

  function callBackLocation(center) {
    setSelectedLocation(center);
  }

  return (
    <div className="sidebar">
      <div className="content">
        <div className="BannerHeading">
          <h4>
            <center>Shore-LINE Detection</center>
          </h4>
        </div>
        <div className="BannerTabs">
          <ul>
            <li className="disc_tab active" onClick={() => handleSmallNav('Discover')}>
              Discover
            </li>
            <li onClick={() => handleSmallNav('Visualize')}>Visualize </li>
          </ul>
        </div>

        {smallNav === 'Discover' ? (
          <div className="discover">
            {/* <DateSelector
              handleCallBackStart={CallBackStartDate}
              startDate={startDate}
              endDate={endDate}
              handlCallBackEnd={CallBackEndDate}
            /> */}
            <LocationDropdown onLocationChange={handleLocationChange} onSelectedLocationChange={callBackLocation} />

            
            <div className="lat-long-container">
              <div className="input-row">
                <label>Start Year:</label>
                <input type="number" step="0.01" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
              </div>
              <div className="input-row">
                <label>End Year:</label>
                <input type="number" step="0.01" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
              </div>
            </div>

            <button className="latlong-btn" onClick={drawBtnHandler}>
              Select Coordinates
            </button>
            <button className="undo">Undo</button>
            <button className="reset">Reset</button>

            {coordinates && (
              <div>
                <p>Latitude: {coordinates.lat.toFixed(2)}</p>
                <p>Longitude: {coordinates.lon.toFixed(2)}</p>
              </div>
            )}

            {loading ? (
              <div>
                <img
                  className="loding"
                  src="https://cdn.dribbble.com/users/121337/screenshots/1024835/loading2.gif"
                  alt=""
                />
              </div>
            ) : null}

            <div>
              <button className="run" onClick={handleRunCLick}>
                RUN
              </button>
            </div>
          </div>
        ) : showVisualize && smallNav === 'Visualize' ? (
          <> 
          </>
          // <Visualize shipTileLayers={resultLayer} />
        ) : null}
      </div>
    </div>
  );
}

export default BannerShoreLine;
