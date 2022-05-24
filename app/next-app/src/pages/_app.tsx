import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import GlobalStyle from '../components/globalStyle';
import favicon from '../public/favicon.ico';
import theme from '../theme/theme';

function MyApp({ Component, pageProps }: AppProps)
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
                <Head>
                    <link rel="shortcut icon" href={favicon} />
                </Head>
                <GlobalStyle />
                <Component {...pageProps} />
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default MyApp;
