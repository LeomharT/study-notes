import fs from 'fs';
import fetch from 'node-fetch';
import { v4 } from 'uuid';
import { WebSocket, WebSocketServer } from 'ws';

console.log(WebSocketServer);

const GetAuthorization = async (): Promise<string> =>
{
    const res = await fetch("https://azure.microsoft.com/en-gb/services/cognitive-services/text-to-speech/");

    const reg = /token: \"(.*?)\"/;

    if (reg.test(await res.text()))
    {
        return RegExp.$1;
    }

    return '';
};

const GetXTime = (): string =>
{
    return new Date().toISOString();
};


(async (): Promise<void> =>
{
    const XConnectionId = v4().toUpperCase().replace(/-/g, '');

    const Authorization = await GetAuthorization();

    const url = `wss://eastus.tts.speech.microsoft.com/cognitiveservices/websocket/v1?Authorization=${Authorization}&X-ConnectionId=${XConnectionId}`;

    const wws = new WebSocket(url);

    const connect = new Promise((reslove, reject) =>
    {
        wws.onopen = () => reslove(true);
        wws.onerror = () => reslove(false);
    });

    if (await connect)
    {
        const message_1 = `Path: speech.config\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${GetXTime()}\r\nContent-Type: application/json\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.19.0","build":"JavaScript","lang":"JavaScript","os":{"platform":"Browser/Linux x86_64","name":"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0","version":"5.0 (X11)"}}}}`;

        console.log('Send 1');
        wws.send(message_1);

        const message_2 = `Path: synthesis.context\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${GetXTime()}\r\nContent-Type: application/json\r\n\r\n{"synthesis":{"audio":{"metadataOptions":{"sentenceBoundaryEnabled":false,"wordBoundaryEnabled":false},"outputFormat":"audio-16khz-32kbitrate-mono-mp3"}}}`;

        console.log('Send 2');
        wws.send(message_2);

        const SSML = `
        <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
            <voice name="zh-CN-XiaoxiaoNeural">
                <mstts:express-as style="general">
                    <prosody rate="0%" pitch="0%">
                    我是一条懒汉
                    </prosody>
                </mstts:express-as>
            </voice>
        </speak>`;

        const message_3 = `Path: ssml\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${GetXTime()}\r\nContent-Type: application/ssml+xml\r\n\r\n${SSML}`;

        console.log('Send 3');
        wws.send(message_3);

        let final_data = Buffer.alloc(0);

        wws.addEventListener('message', (event) =>
        {
            const { data } = event;

            const dataType = typeof data;

            if (dataType === 'string')
            {
                if ((data as string).indexOf('Path:turn.end'))
                {
                    fs.writeFileSync('test.mp3', final_data);
                    wws.close();
                }
            }
            if (dataType === 'object')
            {
                final_data = Buffer.concat([(data as Buffer), final_data], (data as Buffer).length + final_data.length);
            }
        });
    }
})();
