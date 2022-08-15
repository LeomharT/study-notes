import { Classes, InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React, { ChangeEvent } from "react";
import useDebounce from "../../hooks/useDebounce";
import useToggle from "../../hooks/useToggle";
import './assets/scss/autoComplete.scss';

export default function AutoComplete()
{
    const [value, setValue] = useDebounce('', 50);

    //Dispaly options
    const [showOption, setShowOption] = useToggle(false);

    const originOptions = ['React', 'Vue', 'Angular', 'Svelte'];

    const [option, setOption] = useDebounce<string[]>(['React', 'Vue', 'Angular', 'Svelte'], 50);

    return (
        <div className="auto-complete" >
            <InputGroup
                value={value}
                onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                {
                    setShowOption(true);

                    const input = e.target.value;

                    if (input)
                    {
                        setOption([...originOptions.filter(v => v.toUpperCase().includes(input.toUpperCase()))]);
                    }
                }}
                onBlur={e =>
                {
                    setShowOption(false);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                {
                    const input = e.target.value;

                    setValue(input);

                    if (!input)
                    {
                        setOption(originOptions);
                    } else
                    {
                        setOption([...originOptions.filter(v => v.toUpperCase().includes(input.toUpperCase()))]);
                    }
                }}
            />
            {
                (showOption && Boolean(option.length)) &&
                <Menu className={`${Classes.ELEVATION_0} auto-complete-option`}>
                    {option.map(v => <MenuItem2 text={v} key={v} onMouseDown={e =>
                    {
                        const value = (e.target as HTMLDivElement).innerText;

                        setValue(value);
                    }} />)}
                </Menu>
            }
        </div>
    );
}
