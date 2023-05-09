import Map from 'ol/Map';
import {OSM} from 'ol/source.js';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import React, { useRef, useEffect, useContext, useState} from 'react';import './main.css';
import drawcontext from '../context';
import {Vector as VectorSource} from 'ol/source.js';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
function OpenLayersMap(props){
  const {mapObject,setMapObject} = useContext(drawcontext);
  const {source,setVectorSource} = useContext(drawcontext);
  const ref = useRef(null);
  const mapRef = useRef(null);
  const vector = new VectorLayer({
    source: source,
    style:new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({color: 'black'}),
        stroke: new Stroke({
          color: [255,0,0],
          width: 1
        })
      })
    })
  });

  useEffect(() => {
    if (ref.current && !mapRef.current) {
      const vecSource = new VectorSource({wrapX: false});
      setVectorSource(vecSource);
      mapRef.current = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }), 
          vector
        ],
        target: ref.current,
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      setMapObject(mapRef.current);
    }
  }, [ref, mapRef]);

  useEffect(() => {
    console.log(source);
    console.log(vector);
  },[source]);

  return (
    <div>
        <div ref={ref} style={{ width: '100%', height: '800px', paddingTop: '7%' }}></div>
    </div>
  );
}


export default OpenLayersMap;
