export default interface StormwaterTube {
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