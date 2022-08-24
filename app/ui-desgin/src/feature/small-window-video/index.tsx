import React, { PointerEvent, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import './index.scss';


const converTime = (time: number) =>
{
    const hour = Math.floor(time / 3600).toString().padStart(2, '0');

    const minute = Math.floor(time / 60).toString().padStart(2, '0');

    const second = (time % 60 | 0).toString().padStart(2, '0');

    console.log(hour, minute, second);

    return `${hour}:${minute}:${second}`;
};

/**
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
 *
 * - 视频小窗显示,又不使用画中画功能的实现思路是获取到`<video>`元素然后将其插入不同的父元素内
 * 滚动条位置超过固定视频显示高度就将其渲染进小窗元素内
 *
 * - `MDN`中有说明如果插入的子元素已经存在,那么appendChild只会将其移动到新的父元素内,不需要手动
 * 移除,那个元素节点会首先从原位置移除,然后再插入到新的位置.不会销毁这个元素,所以不会出现重绘
 */
export default function SmallWindowVideo()
{
    const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);

    const detectVideoOffScreen = useCallback((e: React.UIEvent<HTMLDivElement>) =>
    {
        //界面最外层父元素,滚动条事件触发的地方
        const wrapper = e.target as HTMLDivElement;

        if (wrapper.scrollTop > 500)
        {
            const container = document.querySelector('.flow-video-container') as HTMLDivElement;

            if (container.childNodes.length !== 0) return;

            container.appendChild(videoRef.current as HTMLVideoElement);

        } else
        {
            const container = document.querySelector('.video-container') as HTMLDivElement;

            if (container.childNodes.length !== 0) return;

            container.appendChild(videoRef.current as HTMLVideoElement);
        }

    }, []);

    const [currTime, setCurrTime] = useState<number>(0);

    const showVideoThumbnail: string | undefined = useMemo<string | undefined>(() =>
    {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');

        canvas.width = videoRef.current!.clientWidth;
        canvas.height = videoRef.current!.clientHeight;

        ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/png') as string;
    }, [currTime]);

    return (
        <div className='small-window-video' onScroll={detectVideoOffScreen}>
            <div style={{ height: '500px' }} className='video-container'>
                <video src='/video/download.mp4' controls={false} ref={videoRef} />
            </div>
            <div style={{ height: '1500px' }}>
                <div className='process_controler'
                    onPointerDown={(e: PointerEvent<HTMLDivElement>) =>
                    {
                        const target = (e.target as HTMLDivElement);

                        target.setPointerCapture(e.pointerId);

                        const process = document.querySelector('.process') as HTMLDivElement;

                        const percentage = Number((e.clientX / target.clientWidth).toFixed(2));

                        const currentTime = videoRef.current!.duration * percentage;

                        process.style.width = target.clientWidth * percentage + 'px';

                        videoRef.current!.currentTime = currentTime;

                        videoRef.current!.play();
                    }}
                    onMouseMove={e =>
                    {
                        const target = (e.target as HTMLDivElement);

                        const percentage = Number((e.clientX / target.clientWidth).toFixed(2));

                        const currentTime = videoRef.current!.duration * percentage;

                        setCurrTime(currentTime);
                    }}
                >
                    <div className='process'></div>
                </div>
                {converTime(currTime)}
                <div className='process_thumbnail'>
                    <img alt='thumbnail' src={showVideoThumbnail} />
                </div>
            </div>
            <div className='flow-video-container'>

            </div>
        </div>
    );
}
