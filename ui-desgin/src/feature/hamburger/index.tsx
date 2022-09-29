import classnames from 'classnames';
import { useMemo, useState } from 'react';
import './scss/index.scss';

export function HamburgerButton()
{
    const [isExpanded, setIsExpanded] = useState(false);

    const className = useMemo(() =>
    {
        return classnames(
            'hamburger',
            'hamburger--elastic',
            {
                'is-active': isExpanded
            }
        );
    }, [isExpanded]);


    return (
        <button
            className={className}
            type="button"
            aria-label="Menu"
            aria-controls="navigation"
            aria-expanded="true"
            onClick={() =>
            {
                setIsExpanded(prve => !prve);
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
    return (
        <div className="hamburger">
            <div>
                <HamburgerButton />
            </div>
        </div >
    );
}
