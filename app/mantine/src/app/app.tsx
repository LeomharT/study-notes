import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import React, { useState } from 'react';
import Buttondemo from '../components/buttondemo';
import theme from '../theme/theme';
export default function App()
{
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        /**
         * ✨✨✨ 'withGlobalStyles' 'withNormalizeCSS' just like import global css file. ✨✨✨
         */
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ ...theme, colorScheme: colorScheme }} withGlobalStyles withNormalizeCSS>
                <div>
                    <Buttondemo />
                </div>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
