import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Autocomplete from '../feature/autocomplete/';
import DargBox from '../feature/darg-box';
import FluentNav from '../feature/fluent-nav/FluentNav';
import Hamburger from '../feature/hamburger';
import SelectRegion from '../feature/marquee-selection/SelectRegion';
import SmallWindowVideo from '../feature/small-window-video';
import Spinner from '../feature/spinner/spinner';

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
                            <p><Link to={'/fluentNav'}>fluentNav</Link></p>
                        </div>
                    }
                    />
                    <Route path='/autocomplete/*' element={<Autocomplete />} />
                    <Route path='/smallwindowsvideo' element={<SmallWindowVideo />} />
                    <Route path='/hamburger' element={<Hamburger />} />
                    <Route path='/darg' element={<DargBox />} />
                    <Route path='/spinner' element={<Spinner />} />
                    <Route path='/selectRegion' element={<SelectRegion />} />
                    <Route path='/fluentNav' element={<FluentNav />} />
                    {/** 现在没有模糊匹配了exact */}
                    {/* <Route path='/mantine' element={<Mantine />} />
                        <Route path='/mantine/:id' element={<Mantine />} /> */}
                    {/* 可以写成嵌套的模式 */}
                </Routes>
            </BrowserRouter>
        </div >
    );
}
