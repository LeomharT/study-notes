import fs from 'fs';
import fetch from 'node-fetch';
import { v4 } from 'uuid';
import { WebSocket } from 'ws';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GetAuthorization = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, reg, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, fetch("https://azure.microsoft.com/en-gb/services/cognitive-services/text-to-speech/")];
            case 1:
                res = _c.sent();
                reg = /token: \"(.*?)\"/;
                _b = (_a = reg).test;
                return [4 /*yield*/, res.text()];
            case 2:
                if (_b.apply(_a, [_c.sent()])) {
                    return [2 /*return*/, RegExp.$1];
                }
                return [2 /*return*/, ''];
        }
    });
}); };
var GetXTime = function () {
    return new Date().toISOString();
};
var SendMessage = function (wws, message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (reslove, reject) {
                wws.send(message, function () { return reslove(); });
            })];
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var XConnectionId, Authorization, url, wws, connect, message_1, message_2, SSML, message_3, final_data_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                XConnectionId = v4().toUpperCase();
                return [4 /*yield*/, GetAuthorization()];
            case 1:
                Authorization = _a.sent();
                url = "wss://eastus.tts.speech.microsoft.com/cognitiveservices/websocket/v1?Authorization=".concat(Authorization, "&X-ConnectionId=").concat(XConnectionId);
                wws = new WebSocket(url);
                connect = new Promise(function (reslove, reject) {
                    wws.onopen = function () { return reslove(true); };
                    wws.onerror = function () { return reslove(false); };
                });
                return [4 /*yield*/, connect];
            case 2:
                if (!_a.sent()) return [3 /*break*/, 6];
                message_1 = "Path: speech.config\r\nX-RequestId: ".concat(XConnectionId, "\r\nX-Timestamp: ").concat(GetXTime(), "\r\nContent-Type: application/json\r\n\r\n{\"context\":{\"system\":{\"name\":\"SpeechSDK\",\"version\":\"1.19.0\",\"build\":\"JavaScript\",\"lang\":\"JavaScript\",\"os\":{\"platform\":\"Browser/Linux x86_64\",\"name\":\"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0\",\"version\":\"5.0 (X11)\"}}}}");
                console.log('Send 1');
                return [4 /*yield*/, SendMessage(wws, message_1)];
            case 3:
                _a.sent();
                message_2 = "Path: synthesis.context\r\nX-RequestId: ".concat(XConnectionId, "\r\nX-Timestamp: ").concat(GetXTime(), "\r\nContent-Type: application/json\r\n\r\n{\"synthesis\":{\"audio\":{\"metadataOptions\":{\"sentenceBoundaryEnabled\":false,\"wordBoundaryEnabled\":false},\"outputFormat\":\"audio-16khz-32kbitrate-mono-mp3\"}}}");
                console.log('Send 2');
                return [4 /*yield*/, SendMessage(wws, message_2)];
            case 4:
                _a.sent();
                SSML = "\n        <speak xmlns=\"http://www.w3.org/2001/10/synthesis\" xmlns:mstts=\"http://www.w3.org/2001/mstts\" xmlns:emo=\"http://www.w3.org/2009/10/emotionml\" version=\"1.0\" xml:lang=\"en-US\">\n            <voice name=\"zh-CN-XiaoxiaoNeural\">\n                <mstts:express-as style=\"sad\">\n                    <prosody rate=\"0%\" pitch=\"0%\">\n                        \u6211\u53EB\u5ED6\u6B63\u626C\uFF0C\u6211\u662F\u4E00\u6761\u61D2\u6C49,\u6211\u662F\u4E00\u4E2A\u50BB\u903C,\u54C8\u54C8\u54C8\uFF01\n                    </prosody>\n                </mstts:express-as>\n            </voice>\n        </speak>\n        ";
                message_3 = "Path: ssml\r\nX-RequestId: ".concat(XConnectionId, "\r\nX-Timestamp: ").concat(GetXTime(), "\r\nContent-Type: application/ssml+xml\r\n\r\n").concat(SSML);
                console.log('Send 3');
                return [4 /*yield*/, SendMessage(wws, message_3)];
            case 5:
                _a.sent();
                final_data_1 = Buffer.alloc(0);
                wws.on('message', function (data, isBinary) {
                    if (!isBinary) {
                        var str = data.toString();
                        if (str.includes("Path:turn.end")) {
                            fs.writeFileSync('./test.mp3', final_data_1);
                            wws.close();
                        }
                    }
                    if (isBinary) {
                        var index = data.toString().indexOf("Path:audio") + 10;
                        var cmbData = data.slice(index + 2);
                        final_data_1 = Buffer.concat([final_data_1, cmbData], final_data_1.length + cmbData.length);
                    }
                });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); })();
