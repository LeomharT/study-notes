import App from "./app/app.js";

const { app } = App.GetInstance();

app.get('/TransVoice', (req, res) =>
{
    res.send('voice');
});
