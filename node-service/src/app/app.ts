import cors from 'cors';
import express, { Express } from 'express';
import { PORT } from '../data/host.js';
export default class Application
{
    constructor()
    {
        this._initExpressConfig();
    }

    private _app: Express = express();

    get app()
    {
        return this._app;
    }

    private _initExpressConfig = (): void =>
    {
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: false }));
    };

    public static startServer = (): void =>
    {
        const { app } = Application.getInstance();

        app.listen(PORT, () =>
        {
            console.log(`\u001b[7;34mApp running successfully at port ${PORT} !!\u001b[0m`);
        });
    };

    private static _instance: Application;

    public static getInstance(): Application
    {
        if (this._instance) return this._instance;

        return this._instance = new Application();
    }
}
