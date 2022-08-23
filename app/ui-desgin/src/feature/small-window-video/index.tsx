import { RefObject, useCallback, useRef } from 'react';
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
                <video src='/video/download.mp4' controls={true} ref={videoRef} />
            </div>
            <div style={{
                height: '1500px'
            }}>

            </div>
            <div className='flow-video-container'>

            </div>
        </div>
    );
}
