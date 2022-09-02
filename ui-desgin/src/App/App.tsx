import { useLayoutEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Autocomplete from '../feature/autocomplete/';
import SmallWindowVideo from '../feature/small-window-video';

export default function App()
{
    useLayoutEffect(() =>
    {
        const html = document.querySelector(':root');

        if (html?.classList.contains('bp4-dark')) return;

        html?.classList.add('bp4-dark');

        document.body.style.color = 'inherit';
    }, []);

    return (
        <div className='App' >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                            <p><Link to={'/autocomplete'} state={{ address: "giao" }}>autocomplete</Link></p>
                            <p><Link to={'/smallwindowsvideo'}>smallwindowsvideo</Link></p>
                        </div>}
                    />
                    <Route path='/autocomplete/*' element={<Autocomplete />} />
                    <Route path='/smallwindowsvideo' element={<SmallWindowVideo />} />
                    {/** 现在没有模糊匹配了exact */}
                    {/* <Route path='/mantine' element={<Mantine />} />
                        <Route path='/mantine/:id' element={<Mantine />} /> */}
                    {/* 可以写成嵌套的模式 */}
                </Routes>
            </BrowserRouter>
        </div >
    );
}
