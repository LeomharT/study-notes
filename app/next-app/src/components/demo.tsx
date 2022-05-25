import { useMantineTheme } from '@mantine/core';
import React from 'react';
import styled from 'styled-components';

export default function Demo()
{
    const theme = useMantineTheme();

    let _Button = styled.div`
        background-color: ${theme.colors.red[1]};
        border-radius   : 20px;
    `;
    return (
        <_Button >ok</_Button>
    );
}
