import React, { useCallback, useState } from 'react';
import './assets/index.scss';


export default function DargBox()
{
    const [images, setImages] = useState<string[]>([
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt0f9e12cf1ca70ec4/629fdeaf57e9c21147b72eaf/Overwatch2_Primary_DKBKGD_compressed.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt5538a5cdb0e16552/60db86c967d3385db9b805be/hearthstone.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltcadd0c49e316fea2/60db86c9ce1eb95db45df71f/starcraft-ii.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blte9a32f331b70f4a0/60db86c93681555f01d08325/heroes-of-the-storm.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt7e1217b682015738/62ebff2da72f6411611540ba/WOW_WClassic_Icon_Vector_Blue_(2).svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt9ba52a3f1100a00c/60db86c967d3385db9b805ba/diablo-ii.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
        "https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/blt959140aefa0792de/60db86bbad189d64efcca220/call-of-duty.svg?width=168&format=webply&dpr=2&disable=upscale&quality=80",
    ]);


    const [isDraggin, setDraggin] = useState<boolean>(false);


    const [currIndex, setIndex] = useState<number>(0);


    const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) =>
    {
        setDraggin(true);

        setIndex(index);

        const { clientX: downX, clientY: downY } = e;

        const drag_target = e.currentTarget as HTMLDivElement;

        const drag_box = drag_target.parentNode as HTMLDivElement;

        const clone = drag_target.cloneNode(true) as HTMLDivElement;

        const { left, top } = drag_target.getBoundingClientRect();

        clone.style.left = left + 'px';
        clone.style.top = top + 'px';

        clone.style.opacity = '0.5';
        clone.style.cursor = 'move';
        clone.style.position = 'absolute';
        clone.style.background = 'transparent';
        clone.style.zIndex = '1';
        clone.style.transition = 'none';

        drag_target.style.opacity = '0';

        drag_box.appendChild(clone);

        window.onmousemove = (e) =>
        {
            const offsetX = e.clientX - downX;
            const offsetY = e.clientY - downY;

            clone.style.left = left + offsetX + 'px';
            clone.style.top = top + offsetY + 'px';
        };



        window.onpointerup = () =>
        {
            setDraggin(false);

            window.onmousemove = null;
            window.onpointerup = null;

            drag_target.style.opacity = '1';

            const { left, top } = drag_target.getBoundingClientRect();
            clone.style.transition = 'all 0.2s ease';
            clone.style.top = top + 'px';
            clone.style.left = left + 'px';

            setTimeout(() =>
            {
                if (drag_box.contains(clone))
                {
                    drag_box.removeChild(clone);
                }
            }, 200);
        };

    }, []);


    const onReorder = useCallback((e: React.PointerEvent<HTMLDivElement>, index: number) =>
    {
        e.stopPropagation();

        if (!isDraggin) return;

        const imgs: string[] = [...images];

        const drag_target = imgs[currIndex];

        const before = imgs.slice(0, index);

        const after = imgs.slice(index, imgs.length - 1);

        console.log(before, after);
        setImages([...before, drag_target, ...after]);
    }, [isDraggin, currIndex]);


    return (
        <div className="darg-box">
            <div className="icon-area">
                {images.map((v, index) => (
                    <div
                        key={v}
                        onPointerDown={e => handleDragStart(e, index)}
                        onPointerEnter={e => onReorder(e, index)}
                        className='drag-item'
                        data-dragging={isDraggin}
                    >
                        {isDraggin && <div className='shadow-cover' />}
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
