import cors from 'cors';
import express, { Express } from 'express';
export default class App
{
    private constructor(
        private _App: Express = express(),
    )
    {
        this._InitAppConfig();
    }

    private config = {
        PORT: 626
    };

    get app(): Express { return this._App; }

    private _InitAppConfig(): void
    {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    static StartServe(): void
    {
        App.GetInstance().app.listen(App.GetInstance().config.PORT, () => console.log(`\u001b[1;34mApp Running Successfully on port ${App.GetInstance().config.PORT}!!\u001b[0m`));
    }

    private static Instance: App;

    static GetInstance(): App
    {
        if (this.Instance) return this.Instance;
        this.Instance = new App();
        return this.Instance;
    }
}
