import { Button, ButtonGroup, Card, Classes, EditableText, HTMLSelect, Intent, Label, Tab, Tabs, Tooltip } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import { Component, createRef, RefObject } from 'react';
import '../../assets/scss/index.scss';
import RtbCabinet from './R2B_Cabinet';
import RtbComments from './R2B_Comments';
import RtbMatrial from './R2B_Matrial';
import RtbParse from './R2B_Parse';



interface RectToBoardState
{
    currActiveTab: string;
    currSelectedConfig: string;
    isAddingConfig: boolean;
    configList: string[];
};
@observer
export default class RectToBoard extends Component<{}, RectToBoardState>
{
    constructor(props: {})
    {
        super(props);
        this.state = {
            currActiveTab: '1',
            isAddingConfig: false,
            configList: ['默认配置', '5CM薄背板', '9CM薄背板'],
            currSelectedConfig: this.state?.configList[0] ?? '默认配置'
        };
    }
    editAbleText: RefObject<EditableText> = createRef<EditableText>();
    render()
    {
        return (
            <Card className='RectToBoard'>
                <header className={Classes.DIALOG_HEADER}>
                    <div className='Panel_Title'>
                        <div className='Panel_Name'>
                            <img className='Panel_Icon' alt='面板图标' src='https://font.cfcad.cn/Icon/Rec2Br.svg' />
                            <h3>
                                矩形变板件
                            </h3>
                        </div>
                        <div className='Panel_Description'>
                            将<span>矩形线框</span>转换为<span>板件</span>
                        </div>
                    </div>
                    <div className='Configurations'>
                        <Label>
                            配置:
                        </Label>
                        {
                            !this.state.isAddingConfig &&
                            <HTMLSelect
                                value={this.state.currSelectedConfig}
                                minimal
                                large
                                iconProps={{ icon: 'caret-down' }}
                                options={this.state.configList}
                                onChange={e =>
                                {
                                    this.setState({
                                        ...this.state,
                                        currSelectedConfig: e.currentTarget.value
                                    });
                                }}
                                onContextMenu={e =>
                                {
                                    e.preventDefault();
                                }}
                            />
                        }
                        {
                            this.state.isAddingConfig &&
                            <EditableText
                                ref={this.editAbleText}
                                defaultValue='新配置(1)'
                                placeholder='请输入配置名' />
                        }
                        <ButtonGroup>
                            <Tooltip content={this.state.isAddingConfig ? '取消' : '添加配置'} placement='auto'>
                                <Button
                                    icon={this.state.isAddingConfig ? 'cross' : 'add'}
                                    minimal
                                    intent={this.state.isAddingConfig ? Intent.NONE : Intent.SUCCESS}
                                    onClick={() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            isAddingConfig: !this.state.isAddingConfig
                                        });
                                    }} />
                            </Tooltip>
                            <Tooltip content='保存配置' placement='auto'>
                                <Button icon='floppy-disk' minimal intent={Intent.PRIMARY} onClick={() =>
                                {
                                    if (!this.editAbleText.current) return;

                                    const { value } = this.editAbleText.current!.state;

                                    if (value)
                                    {
                                        this.setState({
                                            ...this.state,
                                            isAddingConfig: false,
                                            configList: [...this.state.configList].concat([value as string]),
                                            currSelectedConfig: value as string
                                        });
                                    }
                                }} />
                            </Tooltip>
                            <Tooltip content='修改配置' placement='auto' disabled={this.state.isAddingConfig}>
                                <Button icon='edit'
                                    minimal
                                    intent={Intent.NONE}
                                    disabled={this.state.isAddingConfig}
                                    onClick={() =>
                                    {
                                        const arr = this.state.configList;

                                        arr.splice(arr.indexOf(this.state.currSelectedConfig), 1);

                                        console.log(arr);
                                    }}
                                />
                            </Tooltip>
                            <Tooltip content='删除配置' placement='auto' disabled={this.state.isAddingConfig}>
                                <Button icon='trash'
                                    minimal
                                    intent={Intent.DANGER}
                                    disabled={this.state.isAddingConfig}
                                    onClick={() =>
                                    {
                                        const arr = this.state.configList;

                                        arr.splice(arr.indexOf(this.state.currSelectedConfig), 1);

                                        console.log(arr);
                                    }}
                                />
                            </Tooltip>
                        </ButtonGroup>
                    </div>
                </header>
                <main className={Classes.DIALOG_BODY}>
                    <Tabs selectedTabId={this.state.currActiveTab}
                        large
                        animate
                        renderActiveTabPanelOnly
                        onChange={e =>
                        {
                            this.setState({ ...this.state, currActiveTab: e.toString() });
                        }}>
                        <Tab id={'1'} title='柜体配置' panel={<RtbCabinet />} />
                        <Tab id={'2'} title='解析与内缩' panel={<RtbParse />} />
                        <Tab id={'3'} title='材料配置' panel={<RtbMatrial />} />
                        <Tab id={'4'} title='备注' panel={<RtbComments />} />
                    </Tabs>
                </main>
                <footer className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button text='取消' />
                        <Button text='确认' intent={Intent.PRIMARY} />
                    </div>
                </footer>
            </Card>
        );
    }
}
