import { PointerEvent, RefObject, useCallback, useRef } from 'react';
import './index.scss';


export default function SmallWindowVideo()
{
    const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);

    const detectVideoOffScreen = useCallback((e: React.UIEvent<HTMLDivElement>) =>
    {
        const wrapper = document.querySelector('.small-window-video') as HTMLDivElement;

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

    return (
        <div className='small-window-video' onScroll={detectVideoOffScreen}>
            <div style={{ height: '500px' }} className='video-container'>
                <video src='/video/download.mp4' controls={false} ref={videoRef} />
            </div>
            <div style={{
                height: '1500px'
            }}>
                <div className='process_controler' onPointerDown={(e: PointerEvent<HTMLDivElement>) =>
                {
                    const target = (e.target as HTMLDivElement);

                    target.setPointerCapture(e.pointerId);

                    const process = document.querySelector('.process') as HTMLDivElement;

                    const percentage = Number((e.clientX / target.clientWidth).toFixed(2));

                    const currentTime = videoRef.current!.duration * percentage;

                    process.style.width = target.clientWidth * percentage + 'px';

                    videoRef.current!.currentTime = currentTime;

                    videoRef.current!.play();
                }}>
                    <div className='process'></div>
                </div>
            </div>
            <div className='flow-video-container'>

            </div>
        </div>
    );
}
