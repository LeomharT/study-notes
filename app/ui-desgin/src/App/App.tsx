import { FocusStyleManager } from '@blueprintjs/core';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mantine from '../mantine/mantine';
import RectToBoard from '../R2B_Model/components/ReacToBoard/RectToBoard';

export default class App extends Component<{}, {}>
{
    constructor(props: {})
    {
        super(props);
        FocusStyleManager.onlyShowFocusOnTabs();
    }
    render()
    {
        return (
            <div className='App'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<div>hello</div>} />
                        <Route path='/r2bbord' element={<RectToBoard />} />
                        <Route path='/mantine' element={<Mantine />} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}
