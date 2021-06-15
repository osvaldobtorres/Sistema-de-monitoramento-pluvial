import React, { useState } from 'react';
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

  const handleMapToggleChange = (event: React.ChangeEvent<any>) => {
    setState({ ...mapToggles, [event.target.name]: event.target.checked });
  };

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

  // polyline criado usando esse site: https://developers.google.com/maps/documentation/utilities/polylineutility?hl=pt-br
  const linhas: StormwaterTube[] = [
    { id: "1", polyline: "hidp@he}sEiBy@", startCoords: [-8.05541, -34.88869], endCoords: [-8.05488,-34.88840], heightInCm: 80, widthInCm: 80, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 20, waterContaminationPercentual: 0.3, tubeOcupationStatus: TubeOcupationStatus.low, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "2", polyline: "~edp@nc}sEoBeA", startCoords: [-8.05488,-34.88840], endCoords: [-8.05432,-34.88805], heightInCm: 80, widthInCm: 80, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 20, waterContaminationPercentual: 0.35, tubeOcupationStatus: TubeOcupationStatus.medium, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "3", polyline: "nbdp@ha}sE_CqA", startCoords: [-8.05432,-34.88805], endCoords: [-8.05368,-34.88764], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "4", polyline: "n~cp@v~|sEfAaC", startCoords: [-8.05368,-34.88764], endCoords: [-8.05404,-34.88699], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "5", polyline: "v`dp@tz|sE~A}C", startCoords: [-8.05404,-34.88699], endCoords: [-8.05452,-34.88620], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "6", polyline: "vcdp@vu|sEpBdA", startCoords: [-8.05452,-34.88620], endCoords: [-8.05509,-34.88655], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "7", polyline: "hgdp@|w|sEpEvB", startCoords: [-8.05509,-34.88655], endCoords: [-8.05614,-34.88715], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "8", polyline: "zmdp@t{|sENJ", startCoords: [-8.05614,-34.88715], endCoords: [-8.05622,-34.88721], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "9", polyline: "jndp@`||sEaArB", startCoords: [-8.05622,-34.88721], endCoords: [-8.05589,-34.88779], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "10", polyline: "hldp@t_}sE_BrD", startCoords: [-8.05589,-34.88779], endCoords: [-8.05541, -34.88869], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "10", polyline: "~edp@nc}sEaAfB", startCoords: [-8.05488,-34.88840], endCoords: [-8.05455, -34.88892], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "13", polyline: "nbdp@ha}sEeBrD", startCoords: [-8.05432,-34.88805], endCoords: [-8.05381,-34.88895], heightInCm: 80, widthInCm: 80, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 20, waterContaminationPercentual: 0.35, tubeOcupationStatus: TubeOcupationStatus.medium, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "14", polyline: "n~cp@v~|sEoAxC", startCoords: [-8.05368,-34.88764], endCoords: [-8.05328,-34.88841], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "15", polyline: "n~cp@v~|sEgBaA", startCoords: [-8.05368,-34.88764], endCoords: [-8.05316,-34.88731], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "16", polyline: "vcdp@vu|sElBmD", startCoords: [-8.05452,-34.88620], endCoords: [-8.05507,-34.88533], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "17", polyline: "hgdp@|w|sE`BmD", startCoords: [-8.05509,-34.88655], endCoords: [-8.05558,-34.88568], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "18", polyline: "hidp@he}sEqAxC", startCoords: [-8.05541,-34.88869], endCoords: [-8.05500,-34.88946], heightInCm: 80, widthInCm: 80, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 20, waterContaminationPercentual: 0.3, tubeOcupationStatus: TubeOcupationStatus.low, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
    { id: "19", polyline: "jndp@`||sE~AkD", startCoords: [-8.05622,-34.88721], endCoords: [-8.05670,-34.88635], heightInCm: 60, widthInCm: 60, tubeFormat: StormwaterTubeFormat.circular, waterHeightInCm: 10, waterContaminationPercentual: 0.4, tubeOcupationStatus: TubeOcupationStatus.veryHigh, aboveSeaLevelStartInCm: -10, aboveSeaLevelEndInCm: -15 },
  ];

  const sensores: any = [
    { id: "1", coords: [-8.05541, -34.88869], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "2", coords: [-8.05488,-34.88840], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "3", coords: [-8.05432,-34.88805], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "4", coords: [-8.05368,-34.88764], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "5", coords: [-8.05404,-34.88699], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "6", coords: [-8.05452,-34.88620], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "7", coords: [-8.05509,-34.88655], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "8", coords: [-8.05614,-34.88715], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "9", coords: [-8.05622,-34.88721], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "10", coords: [-8.05589,-34.88779], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "11", coords: [-8.05455, -34.88892], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "12", coords: [-8.05381,-34.88895], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "13", coords: [-8.05328,-34.88841], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "14", coords: [-8.05316,-34.88731], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "15", coords: [-8.05507,-34.88533], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "16", coords: [-8.05558,-34.88568], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "17", coords: [-8.05500,-34.88946], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
    { id: "18", coords: [-8.05670,-34.88635], waterHeightInCm: 20, waterContaminationPercentual: 0.3 },
  ];

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
          {mapToggles.tubeOcupation && linhas.map((tube, i) => (
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
          {mapToggles.tubes && linhas.map((tube, i) => (
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
          {mapToggles.sensors && sensores.map((sensor: any, i: number) => (
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
