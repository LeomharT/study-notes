import { ColorScheme } from '@mantine/core';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RectToBoard from '../feature/panel/components/ReacToBoard/RectToBoard';

export default function App()
{
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <div className='App' >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<div>hello</div>} />
                    <Route path='/r2bbord' element={<RectToBoard />} />
                    {/** 现在没有模糊匹配了exact */}
                    {/* <Route path='/mantine' element={<Mantine />} />
                        <Route path='/mantine/:id' element={<Mantine />} /> */}
                    {/* 可以写成嵌套的模式 */}
                </Routes>
            </BrowserRouter>
        </div >
    );
}
