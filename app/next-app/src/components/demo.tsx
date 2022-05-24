import { Global } from '@mantine/core';
import React from 'react';

export default function Demo()
{
    return (
        <Global styles={(theme) => ({
            body: {
                background: theme.colors.blue,
            }
        })} />
    );
}
