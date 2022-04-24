import { Button, FormGroup, InputGroup, Intent, Tooltip } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import AreaWithTitle from '../AreaWithTitle';
import EditableCheckBox from '../EditableCheckBox';

@observer
export default class R2B_Parse extends Component
{
    render()
    {
        return (
            <div className='R2B_Parse'>
                <FormGroup label='柜名:' inline style={{ marginBottom: "15px" }}>
                    <InputGroup small placeholder='请输入柜名'
                        rightElement={<Tooltip placement='auto' content='从图中拾取'>
                            <Button minimal icon='share' intent={Intent.PRIMARY} />
                        </Tooltip>}
                    />
                </FormGroup>
                <AreaWithTitle title='解析板件名' showBorder fill>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }} >
                        <FormGroup label='收口条'>
                            <EditableCheckBox defaultChecked placeholder='输入收口条名称' defaultValue='收口条' />
                        </FormGroup>
                        <FormGroup subLabel='最左侧板'>
                            <EditableCheckBox defaultChecked placeholder='输入左侧立板名称' defaultValue='左侧板' />
                        </FormGroup>
                        <FormGroup subLabel='最右侧板'>
                            <EditableCheckBox defaultChecked placeholder='输入最右侧板名称' defaultValue='右侧板' />
                        </FormGroup>
                        <FormGroup subLabel='最顶层板'>
                            <EditableCheckBox placeholder='输入最顶层板名称' defaultValue='顶层板' />
                        </FormGroup>
                        <FormGroup subLabel='最底侧板'>
                            <EditableCheckBox placeholder='输入最底侧板名称' defaultValue='地脚线' />
                        </FormGroup>
                        <FormGroup subLabel='最底背板'>
                            <EditableCheckBox placeholder='输入最底背板名称' defaultValue='底背板' />
                        </FormGroup>
                    </div>
                </AreaWithTitle>
                <AreaWithTitle title='内缩' showBorder fill>
                    <FormGroup label='立板:' labelInfo={
                        <Tooltip content={'Ctrl+A'}>
                            <Button minimal small icon='issue' intent={Intent.PRIMARY} />
                        </Tooltip>
                    } inline style={{ paddingRight: "24px" }}>
                        <InputGroup small />
                    </FormGroup>
                    <FormGroup label='层板:' labelInfo={
                        <Tooltip content={'Ctrl+Q'}>
                            <Button minimal small icon='issue' intent={Intent.PRIMARY} />
                        </Tooltip>
                    } inline style={{ paddingRight: "24px" }}>
                        <InputGroup small />
                    </FormGroup>
                    <FormGroup label='顶板:' inline>
                        <InputGroup small />
                    </FormGroup>
                    <FormGroup label='底板:' inline>
                        <InputGroup small />
                    </FormGroup>
                    <FormGroup label='地脚:' inline>
                        <InputGroup small />
                    </FormGroup>
                </AreaWithTitle>
            </div >
        );
    }
}
