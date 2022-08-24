import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import fs from 'fs';
import path from 'path';
import Application from "../app/app";
import { URL } from "../data/request";

const { app } = Application.getInstance();

const ffmpeg = createFFmpeg({ log: true });

app.get('/assets/video/*', (req, res) =>
{
    const videoUrl = path.resolve() + '/src' + req.url;

    res.setHeader('Content-Tpye', 'memia/mp4');

    res.sendFile(videoUrl);
});

app.get(URL.VIDEO_THUMBNAIL, async (req, res) =>
{
    console.time('thumbnail');

    const videoUrl = path.resolve() + '/video192x108.mp4';

    if (!ffmpeg.isLoaded())
    {
        await ffmpeg.load();
    }

    //得先写入
    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoUrl));

    //先转码为低分辨率的视频文件
    // await ffmpeg.run('-i', 'video.mp4', '-vf', 'scale=192:108,setsar=1:1', '-threads', '5', '-preset', 'ultrafast', 'video192x108.mp4');
    // fs.writeFileSync('./video192x108.mp4', ffmpeg.FS('readFile', 'video192x108.mp4'));

    await ffmpeg.run('-i', 'video.mp4', "-ss", '00:00:40', '-s', '192x108', '-frames:v', '1', '-q:v', '2', 'ok.png');

    fs.writeFileSync('./ok.png', ffmpeg.FS('readFile', 'ok.png'));

    res.setHeader('Content-Tpye', 'memia/mp4');

    res.sendFile(path.resolve() + '/ok.png');

    console.timeEnd('thumbnail');

    ffmpeg.exit();
});
