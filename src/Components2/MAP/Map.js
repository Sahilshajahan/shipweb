import { useState } from 'react';
import { Map, View } from 'ol';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Draw from 'ol/interaction/Draw';

function MapComponent() {
  const [source] = useState(() => new VectorSource({ wrapX: false }));
  const [draw, setDraw] = useState(null);

  function addInteraction(type) {
    if (type !== 'None') {
      const newDraw = new Draw({
        source: source,
        type: type,
      });
      setDraw(newDraw);
    }
  }

  function handleChange(event) {
    const value = event.target.value;
    if (draw) {
      map.removeInteraction(draw);
    }
    addInteraction(value);
  }

  function handleUndoClick() {
    if (draw) {
      draw.removeLastPoint();
    }
  }

  const map = new Map({
    target: null,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: source,
      }),
    ],
    view: new View({
      center: [-11000000, 4600000],
      zoom: 4,
    }),
  });

  return (
    <div>
      <div id="map" style={{ width: '80%', height: '800px', paddingTop: '7%' }}></div>
      <select id="type" onChange={handleChange}>
        <option value="None">None</option>
        <option value="Point">Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>
      <button id="undo" onClick={handleUndoClick}>
        Undo
      </button>
    </div>
  );
}

export default MapComponent;
