import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import path from 'path';
import Application from "../app/app.js";
import { URL } from "../data/request.js";

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
    const time_stamp = new URLSearchParams(req.url.split('?')[1]).get('time_stamp') as string;

    console.time('thumbnail');

    const videoUrl = path.resolve() + '/video150x80.mp4';

    if (!ffmpeg.isLoaded())
    {
        await ffmpeg.load();
    }

    //得先写入
    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoUrl));

    //先转码为低分辨率的视频文件
    // await ffmpeg.run('-i', 'video.mp4', '-vf', 'scale=150:80,setsar=1:1', '-threads', '5', '-preset', 'ultrafast', 'video150x80.mp4');
    // fs.writeFileSync('./video150x80.mp4', ffmpeg.FS('readFile', 'video150x80.mp4'));

    //-q:v 表示想要的图片质量 2 一般是高质量
    await ffmpeg.run('-i', 'video.mp4', "-ss", time_stamp, '-s', '192x108', '-frames:v', '1', '-q:v', '0', 'ok.png');

    const buffer = Buffer.from(ffmpeg.FS('readFile', 'ok.png'));

    res.setHeader('Content-Tpye', 'image/png');

    res.end(buffer);

    console.timeEnd('thumbnail');

    ffmpeg.exit();
});
