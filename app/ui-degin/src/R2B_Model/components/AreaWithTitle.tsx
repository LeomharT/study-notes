import { MaybeElement } from '@blueprintjs/core';
import React, { Component, CSSProperties } from 'react';


interface AreaWithTitleProps
{
    title: MaybeElement | string;
    showBorder?: boolean;
    fill?: boolean;
    style?: CSSProperties;
}


export default class AreaWithTitle extends Component<AreaWithTitleProps>
{
    render()
    {
        const css: CSSProperties = {
            width: this.props.fill ? '100%' : 'fit-content',
            border: this.props.showBorder ? '1px solid #DCE0E5' : 'none',
            ...this.props.style,
        };
        return (
            <div className='AreaWithTitle' style={css}>
                <div className='Titles'>
                    {this.props.title}
                </div>
                {this.props.children}
            </div>
        );
    }
}
