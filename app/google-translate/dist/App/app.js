"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.config = {
            PORT: 8088,
        };
        this.SetUpApp = () => {
            this.app.use(cors_1.default());
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
        };
        this.app = express_1.default();
        this.SetUpApp();
    }
    static GetInstance() {
        if (this.SingleInstance)
            return this.SingleInstance;
        this.SingleInstance = new App();
        return this.SingleInstance;
    }
}
exports.default = App;
App.StartService = () => {
    App.GetInstance().app.listen(App.GetInstance().config.PORT, () => console.log(`App Running Successfully on port ${App.GetInstance().config.PORT}!!`));
};
