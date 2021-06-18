import sensor from "../models/sensor";
import stormwatertube from "../models/stormwatertube";
import IDal from "./IDal";
import mongoose from 'mongoose';

export default class MongoDal implements IDal {
    constructor() {
        mongoose.connect('mongodburl', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
            }, () => {
                console.log('Conectado ao banco de dados')
            }
        );
    }

    async getSensorList(): Promise<sensor[]> {
        return await mongoose.connection.collection('sensors').find().toArray();
    }

    async getStormwaterTubeList(): Promise<stormwatertube[]> {
        return await mongoose.connection.collection('StormwaterTube').find().toArray();
    }

}