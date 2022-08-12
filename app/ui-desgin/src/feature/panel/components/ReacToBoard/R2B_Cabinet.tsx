import { Checkbox, FormGroup, HTMLSelect, InputGroup, Intent, Radio, RadioGroup, Tooltip } from '@blueprintjs/core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { Component, FormEvent } from 'react';
import AreaWithTitle from '../AreaWithTitle';
import Button from '../LinkButton';
import SmallNumericInput from '../SmallNumericInput';

@observer
export default class R2B_Cabinet extends Component
{
    @observable isSelectTemplate: boolean = false;
    @observable useBoardNameConfig: boolean = false;
    @observable configTemplate: JSX.Element;
    @observable witchBackBoard: number = 1;

    render()
    {
        return (
            <div className='R2B_Cabinet'>
                <FormGroup className='OptionWitchLink' subLabel='根据板件名改属性的配置'>
                    <Checkbox
                        label='板件名配置:'
                        checked={this.useBoardNameConfig}
                        onChange={() => this.useBoardNameConfig = !this.useBoardNameConfig}
                    />
                    <HTMLSelect
                        disabled={!this.useBoardNameConfig}
                        minimal
                        options={['默认', '配置1']}
                        iconProps={{ icon: 'caret-down' }}
                    />
                </FormGroup>
                <FormGroup style={{ marginBottom: "15px" }} label='房间名:' inline>
                    <InputGroup small placeholder='请输入房间名'
                        rightElement={<Tooltip placement='auto' content='从图中拾取'>
                            <Button minimal icon='share' intent={Intent.PRIMARY} />
                        </Tooltip>}
                    />
                </FormGroup>
                <AreaWithTitle title='柜体参数' showBorder fill>
                    <div className='Cabinet_Params'>
                        <FormGroup className='OptionWitchLink'>
                            根据
                            <RadioGroup
                                selectedValue={this.witchBackBoard}
                                inline
                                onChange={(e: FormEvent<HTMLInputElement>) =>
                                {
                                    //@ts-ignore
                                    this.witchBackBoard = Number.parseInt(e.target.value);
                                }}>
                                <Radio value={1} label='单背板' />
                                <Radio value={2} label='多背板' />
                            </RadioGroup>
                            区分柜体
                        </FormGroup>
                        <FormGroup label='柜体深度:' inline>
                            <InputGroup intent={Intent.PRIMARY} small rightElement={
                                <Tooltip placement='auto' content='从图中拾取'>
                                    <Button minimal icon='share' intent={Intent.PRIMARY} />
                                </Tooltip>
                            } />
                        </FormGroup>
                        <FormGroup label='柜体内缩:' inline>
                            <SmallNumericInput small buttonPosition='none' intent={Intent.DANGER} />
                        </FormGroup>
                        <FormGroup label='最大板厚:' inline labelInfo={
                            <Tooltip content={
                                <>如果<span className='TextHit'>板厚</span>大于<span className='TextHit'>最大板厚</span>那么CAD则不将该<span className='TextHit'>实体</span>视为<span className='TextHit'>板</span></>
                            }>
                                <Button minimal small icon='help' intent={Intent.PRIMARY} />
                            </Tooltip>
                        } style={{ paddingRight: "24px" }}>
                            <SmallNumericInput small buttonPosition='none' />
                        </FormGroup>
                        <FormGroup label='地脚厚度:' inline>
                            <SmallNumericInput small buttonPosition='none' />
                        </FormGroup>
                    </div>
                </AreaWithTitle>
                <AreaWithTitle title='背板规则' showBorder fill>
                    <div>
                        <Checkbox label='关联切割' />
                        <Checkbox style={{ marginBottom: 5 }}
                            label='收口条柜名独立'
                        />
                        <FormGroup className='OptionWitchLink'
                            label={this.configTemplate}>
                            <Checkbox label='使用模板' checked={this.isSelectTemplate} onChange={() => this.isSelectTemplate = !this.isSelectTemplate} />
                            <Button
                                isLink
                                rightIcon='open-application'
                                disabled={!this.isSelectTemplate}
                                intent={this.isSelectTemplate ? Intent.PRIMARY : Intent.NONE}
                                text='选择模板'
                                onClick={e =>
                                {
                                    this.configTemplate = <>已选择<span className='TextHit'>模板名</span></>;
                                }}
                            />
                        </FormGroup>

                        <div className='BoardRoles'>
                            <AreaWithTitle showBorder fill title='板配置'>
                                <div style={{ display: "flex", flexFlow: "row wrap" }}>
                                    <FormGroup label='板名:' inline className='FormGroupShort'>
                                        <InputGroup small placeholder='请输入板名'
                                            rightElement={<Tooltip placement='auto' content='从图中拾取'>
                                                <Button minimal icon='share' intent={Intent.PRIMARY} />
                                            </Tooltip>}
                                        />
                                    </FormGroup>
                                    <FormGroup label='板厚:' style={{ paddingLeft: "24px" }} inline className='FormGroupShort'>
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                    <FormGroup label='背板前移:' inline className='FormGroupWitchTip'>
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                    <FormGroup label='板宽:' inline className='FormGroupWitchTip' labelInfo={
                                        <Tooltip content={
                                            <>如果<span className='TextHit'>板宽</span>小于<span className='TextHit'>给定值</span>那么WebCAD将该<span className='TextHit'>实体</span>视为<span className='TextHit'>收口条</span></>
                                        }>
                                            <Button minimal small icon='help' intent={Intent.PRIMARY} />
                                        </Tooltip>
                                    } >
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                    <FormGroup label='板高:' inline className='FormGroupWitchTip' labelInfo={
                                        <Tooltip content={
                                            <>如果<span className='TextHit'>板高</span>小于<span className='TextHit'>给定值</span>那么WebCAD将该<span className='TextHit'>实体</span>视为<span className='TextHit'>收口条</span></>
                                        }>
                                            <Button minimal small icon='help' intent={Intent.PRIMARY} />
                                        </Tooltip>
                                    } >
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                </div>
                            </AreaWithTitle>

                            <AreaWithTitle title='延伸' showBorder>
                                <div style={{ display: 'flex', flexFlow: "row wrap" }}>

                                    <FormGroup label='上延伸:' inline className='FormGroupShort'>
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                    <FormGroup label='下延伸:' inline className='FormGroupShort'>
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>

                                    <FormGroup label='左延伸:' inline className='FormGroupShort'>
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                    <FormGroup label='右延伸:' inline className='FormGroupShort'>
                                        <SmallNumericInput small buttonPosition='none' />
                                    </FormGroup>
                                </div>
                            </AreaWithTitle>

                        </div>
                    </div>
                </AreaWithTitle >
            </div >
        );
    }
}
