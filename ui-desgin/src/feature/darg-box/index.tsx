import { useCallback } from 'react';
import './assets/index.scss';


const IMAGE_URLS: string[] = [
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt0f9e12cf1ca70ec4/629fdeaf57e9c21147b72eaf/Overwatch2_Primary_DKBKGD_compressed.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt5538a5cdb0e16552/60db86c967d3385db9b805be/hearthstone.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltcadd0c49e316fea2/60db86c9ce1eb95db45df71f/starcraft-ii.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blte9a32f331b70f4a0/60db86c93681555f01d08325/heroes-of-the-storm.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt7e1217b682015738/62ebff2da72f6411611540ba/WOW_WClassic_Icon_Vector_Blue_(2).svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt9ba52a3f1100a00c/60db86c967d3385db9b805ba/diablo-ii.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt959140aefa0792de/60db86bbad189d64efcca220/call-of-duty.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
];

export default function DargBox()
{
    const handleDragStart = useCallback((e: React.PointerEvent<HTMLDivElement>) =>
    {
        const { clientX, clientY } = e;

        const drag_target = e.currentTarget as HTMLDivElement;

        const drag_box = drag_target.parentNode as HTMLDivElement;

        const clone = drag_target.cloneNode(true) as HTMLDivElement;

        clone.style.opacity = '0.5';
        clone.style.position = 'absolute';
        clone.style.top = clientY + 'px';
        clone.style.left = clientX + 'px';

        drag_box.appendChild(clone);



        window.onpointerup = () =>
        {
            window.onmousemove = null;
            window.onpointerup = null;

            if (drag_box.contains(clone))
            {
                drag_box.removeChild(clone);
            }
        };

    }, []);

    return (
        <div className="darg-box">
            <div className="icon-area">
                {IMAGE_URLS.map(v => (
                    <div key={v} onPointerDown={handleDragStart} className='drag-item' >
                        <img
                            alt="icon"
                            src={v}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
