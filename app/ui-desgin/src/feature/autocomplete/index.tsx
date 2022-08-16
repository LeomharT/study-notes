import { Classes, InputGroup, Menu } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import React, { ChangeEvent, useMemo, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useToggle from "../../hooks/useToggle";
import './assets/scss/autoComplete.scss';

export default function AutoComplete()
{
    const [value, setValue] = useDebounce('', 50);

    //Dispaly options
    const [showOption, setShowOption] = useToggle(false);

    const [originOptions] = useState<string[]>(['React', 'Vue', 'Angular', 'Svelte']);

    const options = useMemo(() =>
    {
        if (!value) return originOptions;
        return [...originOptions.filter(v => v.toUpperCase().includes(value.toUpperCase()))];
    }, [value, originOptions]);

    return (
        <div className="auto-complete" >
            <InputGroup
                value={value}
                onFocus={async (e: React.FocusEvent<HTMLInputElement>) =>
                {
                    const input = e.target.value;

                    setValue(input);

                    setShowOption(true);
                }}
                onBlur={e =>
                {
                    setShowOption(false);
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                {
                    const input = e.target.value;

                    setValue(input);
                }}
            />
            {
                (showOption && Boolean(options.length)) &&
                <Menu className={`${Classes.ELEVATION_0} auto-complete-option`}>
                    {options.map(v => <MenuItem2 text={v} key={v} onMouseDown={e =>
                    {
                        const value = (e.target as HTMLDivElement).innerText;

                        setValue(value);
                    }} />)}
                </Menu>
            }
        </div>
    );
}
