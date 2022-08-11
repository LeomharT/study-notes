import { FormGroup, HTMLSelect, Icon, InputGroup, Intent } from '@blueprintjs/core';
import React, { Component } from 'react';
import AreaWithTitle from '../AreaWithTitle';
import Button from '../LinkButton';

export default class R2B_Matrial extends Component
{
    render()
    {
        return (
            <div className='R2B_Matrial'>
                <FormGroup
                    className='OptionWitchLink'
                >
                    排钻：
                    <HTMLSelect
                        minimal
                        options={['不排钻', '二合一', '三合一']}
                        iconProps={{ icon: 'caret-down' }}
                        defaultValue='三合一'
                    />
                </FormGroup>
                {/* subLabel啊,因为没有label你labelInfo在语义上就冲突了 */}
                <FormGroup label='封边参数:' subLabel={
                    <div className='Hit'>
                        <Button icon='help' intent={Intent.PRIMARY} minimal />
                        <label>箭头表示纹路方向</label>
                    </div>
                }>
                    <div className='EdgeBandingParams'>
                        <FormGroup className='FormGroupShort'>
                            <InputGroup small defaultValue={'1'} />
                        </FormGroup>
                        <div style={{ display: 'flex', flexFlow: "row nowrap" }}>
                            <FormGroup className='FormGroupShort'  >
                                <InputGroup small defaultValue={'1'} />
                            </FormGroup>
                            <EdgeBanding />
                            <FormGroup className='FormGroupShort'  >
                                <InputGroup small defaultValue={'1'} />
                            </FormGroup>
                        </div>
                        <FormGroup className='FormGroupShort'>
                            <InputGroup small defaultValue={'1'} />
                        </FormGroup>
                    </div>
                </FormGroup>
                <AreaWithTitle showBorder fill title='造型参数'>
                    <div style={{ display: 'flex', flexFlow: "row wrap" }}>
                        <FormGroup className='FormGroupShort' label='刀半径:' inline>
                            <InputGroup small placeholder='3' />
                        </FormGroup>
                        <FormGroup className='FormGroupShort' label='槽加长:' inline>
                            <InputGroup small placeholder='2' />
                        </FormGroup>
                        <FormGroup className='FormGroupShort' label='槽加宽:' inline>
                            <InputGroup small placeholder='1' />
                        </FormGroup>
                        <FormGroup className='FormGroupShort' label='槽加深:' inline>
                            <InputGroup small placeholder='0' />
                        </FormGroup>
                    </div>
                </AreaWithTitle>
                <AreaWithTitle showBorder fill title='材料信息'>
                    <Button
                        isLink
                        rightIcon='open-application'
                        text='选择模板'
                        intent={Intent.PRIMARY}
                        style={{ paddingLeft: 0 }}
                    />
                    <br />
                    <Button
                        isLink
                        rightIcon='share'
                        text='图中拾取'
                        intent={Intent.PRIMARY}
                        style={{ paddingLeft: 0 }}
                    />
                    <FormGroup label='板材:' inline >
                        <InputGroup small defaultValue='默认16CM板材' />
                    </FormGroup>
                    <FormGroup label='材料:' inline >
                        <InputGroup small defaultValue='生态板' />
                    </FormGroup>
                    <FormGroup label='颜色:' inline >
                        <InputGroup small defaultValue={'经典檀木'} />
                    </FormGroup>
                </AreaWithTitle>
            </div >
        );
    }
}


export function EdgeBanding(props: {})
{
    return (
        <div className='EdgeBandingIcon'>
            <Icon icon='arrow-up' />
            <span></span>
            <Icon icon='arrow-down' />
        </div>
    );
}
