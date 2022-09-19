import { createConnection } from 'mysql';
import Application from "../app/app.js";
import { DNS } from "../data/host.js";
import { URL } from "../data/request.js";

const { app } = Application.getInstance();



app.get(URL.fetchExerciseDetail, async (req, res) =>
{
    const conn = createConnection(DNS);



    const result = new Promise((reslove, reject) =>
    {
        conn.query('select * from exercise_detail;', ((err, data) =>
        {
            if (err) reject(err);
            reslove(data);
        }));
    });


    const response = {
        code: 200,
        msg: "success",
        result: {
            data: await result
        }
    };

    res.send(response);


    conn.end();
});
