import { Checkbox, CheckboxProps, EditableText, EditableTextProps, Intent } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

type EditableCheckBoxProps = Pick<EditableTextProps & CheckboxProps,
    keyof EditableTextProps | 'checked' | 'defaultChecked'
>;


@observer
export default class EditableCheckBox extends Component<EditableCheckBoxProps>
{
    @observable isEdit: boolean = this.props.defaultChecked ?? false;
    render()
    {
        return (
            <div className='EditableCheckBox'>
                <Checkbox checked={this.isEdit}
                    onChange={() =>
                    {
                        this.isEdit = !this.isEdit;
                    }}
                />
                <EditableText
                    {...this.props}
                    disabled={!this.isEdit}
                    intent={this.isEdit ? Intent.PRIMARY : Intent.NONE}
                />
            </div>
        );
    }
}
