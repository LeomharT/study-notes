import PQueue from 'p-queue';
import WebSocket, { WebSocketServer } from 'ws';

interface IMsg
{
    type: "scan" | "remote" | "getip";
    ip: string;//
}

//跳板服务
export class WebsocketGangplankServer
{
    _wsServer = new WebSocketServer({ port: 13500 });
    constructor()
    {
        this._wsServer.on("connection", (socket, req) =>
        {
            let remote: WebSocket;

            socket.on("message", async (message) =>
            {
                //连接到远端服务后,不允许在切换服务器,为了性能优先(否则需要转换成string 可能带来性能消耗)
                if (remote)
                {
                    if (remote.readyState === WebSocket.OPEN)
                        remote.send(message);
                    return;
                }

                try
                {
                    let data = JSON.parse(message.toString()) as IMsg;
                    if (data.type === "scan")
                    {
                        let ipBase = data.ip;
                        if (!ipBase || ipBase.split(".").length !== 3)
                        {
                            ipBase = getIPAddress();
                            if (ipBase)
                            {
                                let iparr = ipBase.split(".");
                                iparr.pop();
                                ipBase = iparr.join(".");
                            }
                        }
                        if (ipBase)
                        {
                            let ips = await ScanWebsocketServer(ipBase);
                            socket.send(JSON.stringify({ type: "scan", ips }));
                        }
                        else
                        {
                            socket.send(JSON.stringify({ type: "error", msg: "未提供正确的ip" }));
                        }
                    }
                    else if (data.type === "getip")
                    {
                        socket.send(JSON.stringify({ type: "getip", ip: getIPAddress() }));
                    }
                    else if (data.type === "remote")
                    {
                        //连接到跳板
                        const ConRemote = () =>
                        {
                            remote = new WebSocket(`ws://${data.ip}:9002/loadmesh`);
                            remote.on("open", () =>
                            {
                                socket.send(JSON.stringify({ type: "open" }));//通知客户端WebCAD
                            });

                            //转发消息
                            remote.on("message", (d, i) =>
                            {
                                socket.send(d);
                            });

                            const OnCloseOrError = () =>
                            {
                                socket.send(JSON.stringify({ type: "close" }));//通知客户端WebCAD
                                remote = undefined;
                                if (socket.CLOSED) return;

                                //如果意外断开,尝试重连
                                setTimeout(() =>
                                {
                                    ConRemote();
                                }, 1000);
                            };

                            remote.on("close", OnCloseOrError);
                            remote.on("error", () => { });
                        };

                        ConRemote();
                    }
                }
                catch (error)
                {

                }
            });

        });
    }
}

async function ScanWebsocketServer(ipBase: string)
{
    const availableServers: string[] = [];
    const queue = new PQueue({ concurrency: 32 });

    for (let i = 0; i < 256; i++)
    {
        try
        {
            let ipAddress = ipBase + `.${i}`;
            const remote = new WebSocket(`ws://${ipAddress}:9002/loadmesh`);
            const connect = new Promise((reslove, reject) =>
            {
                let resed = false;
                const res = (v: boolean) =>
                {
                    if (!resed) reslove(v);
                    resed = true;
                };
                remote.on('open', () => res(true));
                remote.on('close', () => res(false));
                remote.on("error", () => res(false));
            });
            queue.add(async () =>
            {
                if (await connect)
                    availableServers.push(ipAddress);
                remote.terminate();
            });
        }
        catch (error)
        {
        }
    }

    await queue.onIdle();

    return availableServers;
}

function getIPAddress(): string
{
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces)
    {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++)
        {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
            {
                return alias.address;
            }
        }
    }
}
