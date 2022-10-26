import React from "react";
import './select-region.scss';

const registEvent = (e: React.PointerEvent<HTMLDivElement>) =>
{
    if (e.buttons !== 1) return;

    const { clientX, clientY } = e;

    const target = e.currentTarget as HTMLDivElement;

    // target.setPointerCapture(e.pointerId);

    const origin = {
        x: clientX,
        y: clientY
    };

    const region = document.createElement('div');

    region.classList.add('region');
    region.style.left = origin.x + 'px';
    region.style.top = origin.y + 'px';

    target.appendChild(region);

    const items = document.getElementsByTagName('li');
    for (const i of items)
    {
        i.style.backgroundColor = 'rgb(243, 242, 241)';
    }

    target.onmousemove = (e) => selectRegion(e, region, origin, target.scrollTop, items);

    target.onpointerup = () =>
    {
        target.onmousemove = null;
        target.onpointerup = null;

        if (target.contains(region)) target.removeChild(region);
    };
};


const selectRegion = (e: MouseEvent, region: HTMLDivElement, origin: any, scrollTop: number, items: HTMLCollection) =>
{
    region.style.border = '1px solid #0078d4';

    const { clientX, clientY } = e;

    const offsetX = origin.x - clientX;
    const offsetY = origin.y - clientY;

    const width = Math.abs(offsetX);
    const height = Math.abs(offsetY);

    region.style.width = width + 'px';
    region.style.height = height + 'px';

    if (offsetX > 0) region.style.left = origin.x - offsetX + 'px';

    let top: number = origin.y;

    if (offsetY > 0) top -= offsetY;

    if (scrollTop > 0) top += scrollTop;

    region.style.top = top + 'px';

    const fromY: number = Math.min(origin.y + scrollTop, clientY + scrollTop);
    const toY: number = Math.max(origin.y + scrollTop, clientY + scrollTop);

    const fromX: number = Math.min(origin.x, clientX);
    const toX: number = Math.max(origin.x, clientX);

    console.log(fromX, toX);

    function detectRangeIn(target: HTMLUListElement): boolean
    {
        const rect = target.getBoundingClientRect();

        if (fromY > rect.top) return true;


        return false;
    }

    for (const i of items)
    {
        const li = i as HTMLUListElement;

        if (detectRangeIn(li))
        {
            li.style.background = 'red';
        } else
        {
            li.style.background = 'rgb(243, 242, 241)';
        }

    }
};

export default function SelectRegion()
{
    return (
        <div onPointerDown={registEvent} className='selected-regions'>
            <ul>
                {(() =>
                {
                    const lis = [];
                    for (let i = 1; i <= 200; i++)
                    {
                        lis.push(
                            <li
                                key={i}
                                style={{
                                    width: Math.floor(Math.random() * (100 - 20)) + 20,
                                }}
                            >
                                {i}
                            </li>
                        );
                    }
                    return lis;
                })()}
            </ul>
        </div>
    );
}
