export function converTime(time: number)
{
    const hour = Math.floor(time / 3600).toString().padStart(2, '0');

    const minute = Math.floor(time / 60).toString().padStart(2, '0');

    const second = (time % 60 | 0).toString().padStart(2, '0');

    return `${hour}:${minute}:${second}`;
};
