import fs from 'fs';
import https from 'https';
import App from './app/app.js';
import './trans-voice.js';
import './trans-word.js';

const { app } = App.GetInstance();

https.createServer({
    key: fs.readFileSync('./7392576_www.liaozhengyang.xyz.key'),
    cert: fs.readFileSync('./7392576_www.liaozhengyang.xyz.pem'),
}, app).listen(626, () =>
{
    console.log(`\u001b[1;34mApp Running Successfully on port 626!!\u001b[0m`);
});
