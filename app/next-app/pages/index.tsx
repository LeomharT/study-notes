import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import type { NextPage } from 'next';
import { useState } from 'react';
import theme from '../theme/theme';
import Buttondemo from './buttondemo';


const Home: NextPage = () =>
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
};

export default Home;
