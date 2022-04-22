import { Button, ButtonGroup, Card, Classes, Icon, InputGroup, Intent } from '@blueprintjs/core';
import React, { Component } from 'react';

export default class SpiralMatrix extends Component<{}, { n: number; matrix: number[]; active: number; }>
{
    constructor(props: {})
    {
        super(props);
        this.state = {
            n: 1,
            matrix: [1],
            active: 0,
        };
    }
    SpiralMatrix = (n: number): number[][] =>
    {
        let [top, buttom, left, right]: number[] = [0, n - 1, 0, n - 1];

        const result = Array.from(Array(n), () => Array(n).fill(0));

        let val: number = 1;

        while (val <= n * n)
        {
            for (let i = left; i <= right; i++)
            {
                result[top][i] = val;
                val++;
            }
            top++;

            for (let i = top; i <= buttom; i++)
            {
                result[i][right] = val;
                val++;
            }
            right--;

            for (let i = right; i >= left; i--)
            {
                result[buttom][i] = val;
                val++;
            }
            buttom--;

            for (let i = buttom; i >= top; i--)
            {
                result[i][left] = val;
                val++;
            }
            left++;
        }
        console.table(result);

        this.setState({
            ...this.state,
            matrix: result.flat(2)
        });
        return result;
    };

    render()
    {
        return (
            <Card>
                <div className={Classes.DIALOG_HEADER}>
                    <Icon icon='cog' />
                    <h3>矩形变板件</h3>
                    <Button icon='cross' minimal />
                </div>
                <div className={Classes.DIALOG_BODY}>
                    <InputGroup onKeyDown={e =>
                    {
                        if (e.key === 'Enter')
                        {
                            let { value }: { value: string | number; } = e.currentTarget;
                            value = Number(value);
                            if (Number.isNaN(value)) return;

                            if (Number(value) > 15) return;
                            this.SpiralMatrix(Number(value));
                            this.setState({ n: Number(value) });
                        }
                    }}
                        rightElement={<Button text='Go' onClick={e =>
                        {
                            this.setState({
                                ...this.state,
                                active: 1
                            });
                            for (let i = 2; i <= Math.pow(this.state.n, 2); i++)
                            {
                                let speed: number = 200;

                                setTimeout(() =>
                                {
                                    this.setState({
                                        ...this.state,
                                        active: i
                                    });
                                }, (i - 1) * (speed));
                                if (i === Math.pow(this.state.n, 2))
                                {
                                    setTimeout(() =>
                                    {
                                        this.setState({
                                            ...this.state,
                                            active: 0
                                        });
                                    }, i * speed);
                                }
                            }

                        }} />}
                    />
                    <ButtonGroup style={{ width: this.state.n * 30, flexWrap: 'wrap' }}>
                        {
                            this.state.matrix.map(v =>
                            {
                                return (
                                    <Button
                                        key={v}
                                        data-key={v}
                                        intent={this.state.active === v ? Intent.PRIMARY : Intent.NONE}
                                    />
                                );
                            })
                        }
                    </ButtonGroup>
                </div>
            </Card>
        );
    }
}
