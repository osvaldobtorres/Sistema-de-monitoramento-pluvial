import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Popup, Polyline, Marker } from 'react-leaflet'
import './App.css';
import polyline from '@mapbox/polyline'
import L, { LatLngExpression } from 'leaflet';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import SensorIcon from "./assets/sensor.svg";

function App() {
  const [mapToggles, setState] = useState({
    tubes: true,
    sensors: false,
    tubeOcupation: false
  });
  const [tubes, setTube] = useState<StormwaterTube[]>([]);
  const [sensores, setSensores] = useState<any>([]);

  const handleMapToggleChange = (event: React.ChangeEvent<any>) => {
    setState({ ...mapToggles, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    fetch("http://localhost:3050/stormwatertubes")
      .then(response => response.text())
      .then(result => { setTube(JSON.parse(result)) })
      .catch(error => console.log('error fetching tubes', error));

    fetch("http://localhost:3050/sensors")
      .then(response => response.text())
      .then(result => { setSensores(JSON.parse(result)) })
      .catch(error => console.log('error fetching sensors', error));
  });

  enum StormwaterTubeFormat {
    circular = 1,
    quadrat = 2,
    rectangular = 3
  }

  enum TubeOcupationStatus {
    veryLow = 1,
    low = 2,
    medium = 3,
    high = 4,
    veryHigh = 5,
    obstructed = 6,
    noInformation = 7
  }

  interface StormwaterTube {
    id: string;
    polyline: string;
    startCoords: [number, number];
    endCoords: [number, number];
    heightInCm: number;
    widthInCm: number;
    tubeFormat: StormwaterTubeFormat;
    waterHeightInCm?: number;
    waterContaminationPercentual?: number;
    tubeOcupationStatus: TubeOcupationStatus;
    aboveSeaLevelStartInCm: number;
    aboveSeaLevelEndInCm: number;
    lengthInCm?: number;
  }

  const getTubeColor = (tubeOcupation: TubeOcupationStatus): string => {
    switch(tubeOcupation) {
      case TubeOcupationStatus.veryLow:
        return "#74ed40"
      case TubeOcupationStatus.low:
        return "#7ea655"
      case TubeOcupationStatus.medium:
        return "#d9f02b"
      case TubeOcupationStatus.high:
        return "#ffd500"
      case TubeOcupationStatus.veryHigh:
        return "#ff8e1c"
      case TubeOcupationStatus.obstructed:
        return "#ff1c1c"
      case TubeOcupationStatus.noInformation:
        return "#c4c4c4"
      default:
        return "#000000"
    }
  }

  function getPercentValue(value?: number): string {
    if (value == null)
      return "";
    return value * 100 + "%";
  }

  const getOcupationText = (tubeOcupation: TubeOcupationStatus): string => {
    switch(tubeOcupation) {
      case TubeOcupationStatus.veryLow:
        return "Muito baixa"
      case TubeOcupationStatus.low:
        return "Baixa"
      case TubeOcupationStatus.medium:
        return "Média"
      case TubeOcupationStatus.high:
        return "Alta"
      case TubeOcupationStatus.veryHigh:
        return "Muito Alta"
      case TubeOcupationStatus.obstructed:
        return "Obstruida"
      default:
        return ""
    }
  }

  const getTubeFormatText = (tubeFormat: StormwaterTubeFormat): string => {
    switch(tubeFormat) {
      case StormwaterTubeFormat.circular:
        return "Circular"
      case StormwaterTubeFormat.quadrat:
        return "Quadrado"
      case StormwaterTubeFormat.rectangular:
        return "Retangular"
      default:
        return ""
    }
  }

  const sensorIcon: L.Icon = new L.Icon({
    iconUrl: SensorIcon,
    iconSize: [30, 30]
  });

  const position: LatLngExpression = [-8.053646590298746, -34.88764511307738];
  return (
      <div className="main-container">
        <MapContainer center={position} zoom={30}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> teste contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapToggles.tubeOcupation && (tubes.length > 0) && tubes.map((tube, i) => (
            <Polyline key = {i} positions={polyline.decode(tube.polyline)} color={getTubeColor(tube.tubeOcupationStatus)} weight={5}>
              <Popup>
                <div>
                  <Typography variant="body2">{"Código da tubulação: " + tube.id}</Typography>
                  <Typography variant="body2">{"Ocupação: " + getOcupationText(tube.tubeOcupationStatus)}</Typography>
                  <Typography variant="body2">{"Altura da água: " + tube.waterHeightInCm + "cm"}</Typography>
                  <Typography variant="body2">{"Percentual de contaminação da água: " + getPercentValue(tube?.waterContaminationPercentual)}</Typography>
                </div>
              </Popup>
            </Polyline>
          ))}
          {mapToggles.tubes && (tubes.length > 0) && tubes.map((tube, i) => (
            <Polyline key = {i} positions={polyline.decode(tube.polyline)} weight={5}>
              <Popup>
                <div>
                  <Typography variant="body2">{"Código da tubulação: " + tube.id}</Typography>
                  <Typography variant="body2">{"Formato da tubulação: " + getTubeFormatText(tube.tubeFormat)}</Typography>
                  <Typography variant="body2">{"Altura da tubulação: " + tube.heightInCm + "cm"}</Typography>
                  <Typography variant="body2">{"Largura da tubulação: " + tube.widthInCm + "cm"}</Typography>
                  <Typography variant="body2">{"Declividade 2%"}</Typography>
                </div>
              </Popup>
            </Polyline>
          ))}
          {mapToggles.sensors && sensores && sensores.map((sensor: any, i: number) => (
            <Marker key = {i} position={sensor.coords} icon={sensorIcon}>
              <Popup>
                <div>
                  <Typography variant="body2">{"Código do sensor: " + sensor.id}</Typography>
                  <Typography variant="body2">{"Altura da água: " + sensor.waterHeightInCm + "cm"}</Typography>
                  <Typography variant="body2">{"Percentual de contaminação da água: " + getPercentValue(sensor?.waterContaminationPercentual)}</Typography>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <div className="control-container">
        <FormControlLabel
          control={<Checkbox color="primary"/>}
          label="Encanamentos"
          name="tubes"
          checked={mapToggles.tubes}
          onChange={handleMapToggleChange}
        />
        <FormControlLabel
          control={<Checkbox color="primary"/>}
          label="Sensores"
          name="sensors"
          checked={mapToggles.sensors}
          onChange={handleMapToggleChange}
        />
        <FormControlLabel
          control={<Checkbox color="primary"/>}
          label="Volume de água"
          name="tubeOcupation"
          checked={mapToggles.tubeOcupation}
          onChange={handleMapToggleChange}
        />
      </div>
    </div>
  );
}

export default App;
