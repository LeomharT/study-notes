import { Button as BpButton, ButtonProps, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import React, { Component, CSSProperties } from 'react';


type LinkButtonProps = Pick<ButtonProps, keyof ButtonProps> & { style?: CSSProperties, isLink?: boolean; };
/**
 * @description 拥有BlueprintJS<Button/>的所有功能,只是重载添加了Link样式
 */
export default class Button extends Component<LinkButtonProps>
{
    render()
    {
        const className = classNames([
            'LinkButton',
            {
                [`LinkButton${this.props.intent}`]: this.props.intent && this.props.intent !== Intent.NONE
            }
        ]);

        let { isLink, ...butProps } = this.props;

        if (isLink)
        {
            return (
                <BpButton {...butProps} className={className} />
            );
        }
        return (
            <BpButton {...butProps} />
        );
    }
}
