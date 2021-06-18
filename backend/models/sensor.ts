export default interface Sensor {
  id: string;
  coords: [number, number];
  waterHeightInCm: number;
  waterContaminationPercentual: number;
}