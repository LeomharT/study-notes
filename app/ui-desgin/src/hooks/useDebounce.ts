import { RefObject, useRef, useState } from "react";

/**
 *
 * @param defaultValue 默认值
 * @param time 函数延时
 */
export default function useDebounce<T = any>(defaultValue: T, time: number)
{
    const [value, setValue] = useState<T>(defaultValue);

    const timerRef: RefObject<NodeJS.Timeout | null> = useRef<NodeJS.Timeout | null>(null);

    const setDebounceValue = (newValue: T) =>
    {
        if (timerRef.current) clearTimeout(timerRef.current);

        (timerRef.current as NodeJS.Timeout) = setTimeout(() =>
        {
            setValue(newValue);
        }, time);

        (timerRef.current as null) = null;
    };

    return [value, setDebounceValue] as const;
}
