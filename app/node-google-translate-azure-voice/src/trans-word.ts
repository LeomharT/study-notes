import App from "./app/app.js";


const { app } = App.GetInstance();


app.get('/TransWord', (req, res) =>
{
    res.send('words');
});
