import { useLayoutEffect } from "react";

export default function useDarkTheme()
{
    useLayoutEffect(() =>
    {
        const html = document.querySelector(':root');

        if (html?.classList.contains('bp4-dark')) return;

        html?.classList.add('bp4-dark');

        document.body.style.color = 'inherit';

        return () =>
        {
            html?.classList.remove('bp4-dark');
        };
    }, []);
}
