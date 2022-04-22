import { Classes, NumericInput, NumericInputProps } from '@blueprintjs/core';
import React, { Component, createRef, RefObject } from 'react';



type SmallNumericInputProps = Pick<NumericInputProps, keyof NumericInputProps> & { small?: boolean; };
/**
 * @description 只是在原来的NumericInput的基础上添加了small样式,为什么官方不加呢????
 */
export default class SmallNumericInput extends Component<SmallNumericInputProps>
{
    numericInputRef: RefObject<NumericInput> = createRef<NumericInput>();
    componentDidMount()
    {
        if (this.props.small)
        {
            this.numericInputRef.current?.inputElement?.classList.add(Classes.SMALL);
        }
    }
    render()
    {
        const { small, ...numericInputProps } = this.props;
        return (
            <NumericInput ref={this.numericInputRef} {...numericInputProps} />
        );
    }
}
