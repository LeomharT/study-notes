import cors from 'cors';
import express, { Express } from 'express';

export default class App
{
    constructor()
    {
        this.app = express();
        this.SetUpApp();
    }
    readonly app: Express;
    readonly config = {
        PORT: 8088,
    };
    SetUpApp = (): void =>
    {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    };
    static StartService = (): void =>
    {
        App.GetInstance().app.listen(App.GetInstance().config.PORT, () => console.log(`App Running Successfully on port ${App.GetInstance().config.PORT}!!`));
    };
    static SingleInstance: App;
    static GetInstance(): App
    {
        if (this.SingleInstance) return this.SingleInstance;
        this.SingleInstance = new App();
        return this.SingleInstance;
    }
}
