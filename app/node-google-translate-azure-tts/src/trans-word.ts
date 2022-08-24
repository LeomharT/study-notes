import fetch from "node-fetch";
import App from "./app/app.js";
import { GetLanguage } from "./util/util.js";


const { app } = App.GetInstance();

const userAgents: string[] = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", // 13.5%
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36", // 6.6%
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0", // 6.4%
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0", // 6.2%
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36", // 5.2%
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36" // 4.8%
];


const GetUriHeader = (trans_word: string) =>
{
    let from: string = GetLanguage(trans_word) ? 'zh-CN' : 'en';

    let uri = '';
    uri = "https://translate.goo";
    uri += "gleapis.com/transl";
    uri += "ate_a";
    uri += "/singl";
    uri += "e?client=gtx&sl=" + encodeURI(from) + "&tl=" + encodeURI(from === 'zh-CN' ? 'en' : 'zh-CN') + "&dt=t" + "&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=7&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&q=";
    uri += encodeURI(trans_word);

    const header = userAgents[Math.random() * (userAgents.length - 1) | 0];
    return { uri, userAgents: header };

};


app.get('/TransWord', async (req, res) =>
{
    const trans_word = new URLSearchParams(req.url.split('?')[1]).get('trans_word');

    if (!trans_word)
    {
        res.send('出错了');
        return;
    }

    const { uri, userAgents } = GetUriHeader(trans_word);

    const response = await fetch(uri, {
        headers: {
            'User-Agents': userAgents
        }
    });

    res.send(await response.json());
});
