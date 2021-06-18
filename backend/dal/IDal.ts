import Sensor from "../models/sensor";
import StormwaterTube from "../models/stormwatertube";

export default interface IDal {
    getSensorList(): Promise<Sensor[]>;
    getStormwaterTubeList(): Promise<StormwaterTube[]>;
}