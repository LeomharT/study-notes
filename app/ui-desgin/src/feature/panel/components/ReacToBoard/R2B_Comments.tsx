import { EditableCell2, Table2 } from '@blueprintjs/table';
import "@blueprintjs/table/lib/css/table.css";
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';

@observer
export default class R2B_Comments extends Component
{

    constructor(props: {})
    {
        super(props);
        this.RenderCell = this.RenderCell.bind(this);

        this.commentsData[5][0] = '玻璃屏幕就是通透'; this.commentsData[5][1] = '啊哈哈哈哈哈哈';

        this.commentsData[9][0] = '哈哈'; this.commentsData[9][1] = '😀';
    }
    @observable commentsData: any[][] = Array.from(Array(10), () => Array(2).fill(''));
    @observable cm = [[1, 2], [2, 3]];
    RenderCell(rowIndex: number, columnIndex: number) //要用this就要用箭头函数,不如就是要绑定this
    {
        return (
            <EditableCell2 value={this.commentsData[rowIndex][columnIndex]}
                onChange={e =>
                {
                    this.commentsData[rowIndex][columnIndex] = e;
                }} onConfirm={e => { console.log(this.commentsData); }} />
        );
    };
    render()
    {
        return (
            <div className='R2B_Comments'>
                <Table2 numRows={10} columnWidths={[150, 490]}>
                    {/* <Column name="备注名" cellRenderer={this.RenderCell} />
                    <Column name="备注信息" cellRenderer={this.RenderCell} /> */}
                </Table2>
            </div >
        );
    }
}
