import { Global } from '@mantine/core';
import React from 'react';
import proximaNovaBlack from '../assets/fonts/proxima-nova-black.woff2';
import proximaNovaLightWoff2 from '../assets/fonts/proxima-nova-light.woff2';

export default function GlobalStyle()
{
    return (
        <Global styles={(theme) => ([
            {
                body: {
                    background: theme.colors.blue[4],
                }
            },
            {
                '@font-face': {
                    fontFamily: 'Greycliff CF',
                    src: `url('${proximaNovaLightWoff2}') format("woff2")`,
                    fontWeight: 900,
                    fontStyle: 'normal',
                },
            },
            {
                '@font-face': {
                    fontFamily: 'Proxima Nova',
                    src: `url('${proximaNovaBlack}') format("woff2")`,
                    fontWeight: 900,
                    fontStyle: 'normal',
                },
            }
        ])} />
    );
}
