import { Request, Response } from "express";
import { URLSearchParams } from "url";
import { v4 as uuidv4 } from 'uuid';
import { RawData, WebSocket } from 'ws';
//@ts-ignore
import App from './app/app.ts';
//@ts-ignore
import { GetAuthorization, GetXTime, SendMessage } from './util/utils.ts';

const { app } = App.GetInstance();


app.get('/GetAzureVoice', async (req: Request, res: Response): Promise<void> =>
{
    const params = new URLSearchParams(req.url.split('?')[1]);

    const trans_word = params.get('trans_word');

    if (!trans_word)
    {
        res.end();
        return;
    }

    const XConnectionId = uuidv4().toUpperCase();

    const Authorization = await GetAuthorization();

    const url = `wss://eastus.tts.speech.microsoft.com/cognitiveservices/websocket/v1?Authorization=${Authorization}&X-ConnectionId=${XConnectionId}`;

    const from: 'zh-CN' | 'en-US' = /[\u4E00-\u9FA5]+/g.test(trans_word.trim()) ? 'zh-CN' : 'en-US';

    const wws = new WebSocket(url);

    const connect = new Promise((reslove, reject) =>
    {
        wws.onopen = () => reslove(true);
        wws.onerror = () => reslove(false);
    });

    if (!await connect)
    {
        res.end();
        return;
    }

    const message_1 = `Path: speech.config\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${GetXTime()}\r\nContent-Type: application/json\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.19.0","build":"JavaScript","lang":"JavaScript","os":{"platform":"Browser/Linux x86_64","name":"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0","version":"5.0 (X11)"}}}}`;

    console.log('Send 1');
    await SendMessage(wws, message_1);

    const message_2 = `Path: synthesis.context\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${GetXTime()}\r\nContent-Type: application/json\r\n\r\n{"synthesis":{"audio":{"metadataOptions":{"sentenceBoundaryEnabled":false,"wordBoundaryEnabled":false},"outputFormat":"audio-16khz-32kbitrate-mono-mp3"}}}`;

    console.log('Send 2');
    await SendMessage(wws, message_2);

    const SSML = `
        <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
            <voice name="${from}-${from === 'zh-CN' ? 'XiaoxiaoNeural' : 'JennyNeural'}">
                <mstts:express-as style="normal">
                    <prosody rate="0%" pitch="0%">
                        ${trans_word}
                    </prosody>
                </mstts:express-as>
            </voice>
        </speak>
        `;

    const message_3 = `Path: ssml\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${GetXTime()}\r\nContent-Type: application/ssml+xml\r\n\r\n${SSML}`;

    console.log('Send 3');
    await SendMessage(wws, message_3);

    let final_data = Buffer.alloc(0);

    wws.on('message', (data: RawData, isBinary: boolean) =>
    {
        if (!isBinary)
        {
            let str = data.toString();
            if (str.includes("Path:turn.end"))
            {
                wws.close();

                res.setHeader('Content-Type', 'audio/mp3');
                res.setHeader('Content-Length', final_data.length);
                res.setHeader("Accept-Ranges", "bytes");

                //可以使用end发送Buffer
                res.end(final_data);

                //保存为文件然后读取文件的方法 => 这个方法在前端也是读取res.blob()获取数据然后URL转为资源
                // fs.writeFileSync('./result.mp3', final_data);

                // const stat = fs.readFileSync('./result.mp3');

                // res.writeHead(200, {
                //     'Content-Type': 'audio/mp3',
                //     'Content-Length': stat.length,
                //     "Accept-Ranges": "bytes"
                // });

                // const read_stream = fs.createReadStream('./result.mp3');

                // read_stream.pipe(res);
            }
        }
        if (isBinary)
        {
            const index = data.toString().indexOf("Path:audio") + 10;
            const cmbData = data.slice(index + 2);
            final_data = Buffer.concat([final_data, (cmbData as Buffer)], final_data.length + (cmbData as Buffer).length);
        }
    });
});
