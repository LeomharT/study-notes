"use strict";
var __importDefault = (this && this.__importDefault) || function (mod)
{
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const app_1 = __importDefault(require("../dist/App/app"));
/**
 * How Telegram Messenger circumvents Google Translate's API
 * https://danpetrov.xyz/programming/2021/12/30/telegram-google-translate.html
 */
const { app } = app_1.default.GetInstance();
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:95.0) Gecko/20100101 Firefox/95.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36" // 4.8%
];
const hd = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    "cookie": "BIDUPSID=E6A587895A5DEF7E8881F6DF0DE08A5C; PSTM=1601290922; __yjs_duid=1_ea28172d685c2dfab5a462e7197f9bfa1619333958075; H_WISE_SIDS=107315_110085_127969_131423_146873_154212_165135_165935_166147_167729_168308_170142_170817_170935_171710_172119_172468_172643_172924_173125_173370_173414_173592_173601_173609_173791_174197_174358_174446_174477_174479_174520_174581_174617_174638_174661_174949_174968_175364_8000065_8000120_8000140; BAIDUID=EB4DD12816E85F57EACC4A2AAC16BDB9:FG=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; MCITY=-300%3A; H_PS_PSSID=35839_35105_36004_34584_35872_36036_35949_35955_35984_35319_26350_36009; delPer=0; PSINO=6; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1646826009; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1646826009; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; APPGUIDE_10_0_2=1; ab_sr=1.0.1_N2UxNDk5ODk3NGRiMmNlZTliY2IyNmQ4NTM0NWY0ZjQ4MTU1Nzk0OTIyZDg3NWQxNDk0MmI5YzhiNzU0M2EyNDVkMTk5ZjliMTJiNjljZGI3NmU1OTVlMzQ3ODY5NzVjMjQzNTBkNzZjNDcwMWY0NTUxNWRmYTQ5YTUzNWY4MzBiY2ZmNzFlMmE0ZTlkM2M3NTJhMmJjNmRjMzEwYjZiNg=="
};
const GetUriHeader = (transWord) =>
{
    let from = /[\u4E00-\u9FA5]+/g.test(transWord.trim()) ? 'zh-CN' : 'en';
    let uri = '';
    uri = "https://translate.goo";
    uri += "gleapis.com/transl";
    uri += "ate_a";
    uri += "/singl";
    uri += "e?client=gtx&sl=" + encodeURI(from) + "&tl=" + encodeURI(from === 'zh-CN' ? 'en' : 'zh-CN') + "&dt=t" + "&ie=UTF-8&oe=UTF-8&otf=1&ssel=0&tsel=0&kc=7&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&q=";
    uri += encodeURI(transWord);
    const header = userAgents[Math.random() * (userAgents.length - 1) | 0];
    return { uri, userAgents: header };
};
app.get("/", (req, res) =>
{
    const { uri, userAgents } = GetUriHeader('lion');
    request_1.default(uri, { headers: { 'User-Agent': userAgents } }, (err, response, body) =>
    {
        if (err)
            throw new Error(err);
        console.log(...JSON.parse(response.body));
        res.send(JSON.parse(response.body));
    });
});
app_1.default.StartService();
