import { WebSocket } from 'ws';

export const GetAuthorization = async (): Promise<string> =>
{
    const res = await fetch("https://azure.microsoft.com/en-gb/services/cognitive-services/text-to-speech/");

    const reg = /token: \"(.*?)\"/;

    if (reg.test(await res.text()))
    {
        return RegExp.$1;
    }

    return '';
};

export const GetXTime = (): string =>
{
    return new Date().toISOString();
};

export const SendMessage = async (wws: WebSocket, message: string): Promise<void> =>
{
    return new Promise((reslove, reject) =>
    {
        wws.send(message, () => reslove());
    });
};
