import { FocusStyleManager } from '@blueprintjs/core';
import React, { Component } from 'react';
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
                <RectToBoard />
            </div>
        );
    }
}
