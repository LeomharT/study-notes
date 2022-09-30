import { FocusStyleManager } from '@blueprintjs/core';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import classnames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import './scss/index.scss';

export type HamburgerButtonProps = {
    className?: string;
    isExpanded?: boolean;
    onClick?: (e: React.MouseEvent) => any;
};

FocusStyleManager.onlyShowFocusOnTabs();

export function HamburgerButton(props: HamburgerButtonProps)
{
    const className = useMemo(() =>
    {
        return classnames(
            'hamburger',
            'hamburger--elastic',
            {
                'is-active': props.isExpanded
            },
            props.className
        );
    }, [props.isExpanded, props.className]);


    return (
        <button
            className={className}
            type="button"
            aria-label="Menu"
            aria-controls="navigation"
            aria-expanded="true"
            onClick={(e) =>
            {
                if (props.onClick)
                    props.onClick(e);
            }}
        >
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    );
}



export default function Hamburger()
{
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() =>
    {

        //@ts-ignore
        console.log($);
    }, []);

    return (
        <div className="hamburger-demo">
            <header>
                <HamburgerButton
                    className='navi_btn'
                    isExpanded={isExpanded}
                    onClick={e =>
                    {
                        setIsExpanded(prve => !prve);
                    }}
                />
            </header>
            <main>
                <div className='popover-navi' aria-expanded={isExpanded}>
                    <div className="expander" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        一级菜单
                    </div>
                    <div className="collapse" id="collapseExample">
                        <div className="well">
                            <a href='#'>二级菜单</a>
                        </div>
                    </div>
                    <div className="expander"
                        data-toggle="collapse"
                        data-target="#collapseExample2"
                        aria-expanded="false"
                        aria-controls="collapseExample2"
                    >
                        一级菜单
                    </div>
                    <div className="collapse" id="collapseExample2">
                        <div className="well">
                            <a href='#'>二级菜单1</a>
                            <a href='#'>二级菜单2</a>
                            <a href='#'>二级菜单3</a>
                            <a href='#'>二级菜单4</a>
                            <a href='#'>二级菜单5</a>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    );
}
