import Application from "../app/app.js";
import { URL } from "../data/request.js";

const { app } = Application.getInstance();

app.get(URL.EXERCISELIST, (req, res) =>
{
    const data: any[] = [

    ];


    res.send(data);
});
