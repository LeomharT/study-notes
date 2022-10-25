import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Autocomplete from '../feature/autocomplete/';
import DargBox from '../feature/darg-box';
import Hamburger from '../feature/hamburger';
import SelectRegion from '../feature/select-region/SelectRegion';
import SmallWindowVideo from '../feature/small-window-video';

export default function App()
{
    return (
        <div className='App' >
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: "column" }}>
                            <p><Link to={'/autocomplete'} state={{ address: "giao" }}>autocomplete</Link></p>
                            <p><Link to={'/smallwindowsvideo'}>smallwindowsvideo</Link></p>
                            <p><Link to={'/hamburger'}>hamburger</Link></p>
                            <p><Link to={'/darg'}>darg</Link></p>
                            <p><Link to={'/spinner'}>spinner</Link></p>
                            <p><Link to={'/selectRegion'}>selectRegion</Link></p>
                        </div>
                    }
                    />
                    <Route path='/autocomplete/*' element={<Autocomplete />} />
                    <Route path='/smallwindowsvideo' element={<SmallWindowVideo />} />
                    <Route path='/hamburger' element={<Hamburger />} />
                    <Route path='/darg' element={<DargBox />} />
                    <Route path='/selectRegion' element={<SelectRegion />} />
                    {/** 现在没有模糊匹配了exact */}
                    {/* <Route path='/mantine' element={<Mantine />} />
                        <Route path='/mantine/:id' element={<Mantine />} /> */}
                    {/* 可以写成嵌套的模式 */}
                </Routes>
            </BrowserRouter>
        </div >
    );
}
