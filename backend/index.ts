import express, { Application, Request, Response } from "express";
import IDal from "./dal/IDal";
import MongoDal from "./dal/MongoDal";
import cors from 'cors';

const app: Application = express();
const port = 3050;

const dal: IDal = new MongoDal();

app.use(cors);

app.get(
    "/stormwatertubes",
    async (req: Request, res: Response): Promise<Response> => {
        const tubes = await dal.getStormwaterTubeList();
        return res.status(200).send(tubes);
    }
);

app.get(
    "/sensors",
    async (req: Request, res: Response): Promise<Response> => {
        const sensors = await dal.getSensorList();
        return res.status(200).send(sensors);
    }
);

try {
    app.listen(port, (): void => {
        console.log(`Backend online na porta localhost: ${port}`);
    });
} catch (error) {
    console.error(`Ocorreu um erro: ${error.message}`);
}