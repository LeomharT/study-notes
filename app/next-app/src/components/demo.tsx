import { useMantineTheme } from '@mantine/core';
import React from 'react';
import styled from 'styled-components';


let _Button = styled.div`
    background-color: ${props => props.theme.colors.red[1]};
    border-radius   : 20px;
`;

export default function Demo()
{
    const theme = useMantineTheme();

    return (
        <_Button theme={theme}>ok</_Button>
    );
}
