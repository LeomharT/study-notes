function arrIndexPlusOne(grid: number[][]): number[][]
{
    const girdSize = grid[0].length ?? 0;

    const flatGrid = grid.flat(2);

    const target: number[] = [];

    target[0] = flatGrid.pop() as number;
    for (let i = 0; i < flatGrid.length; i++)
    {
        target.push(flatGrid[i]);
    }

    return target.reduce((prve: number[][], curr: number, index: number) =>
    {
        const arr: number[] = prve[0] && prve[0].length < girdSize ? prve[0] : [];

        arr.push(curr);

        if (arr.length === 1)
        {
            prve.unshift(arr);
        } else
        {
            prve[0] = arr;
        }

        return prve;
    }, []).reverse();
}


function shiftGrid(grid: number[][], k: number): number[][]
{
    let target: number[][] = arrIndexPlusOne(grid);

    for (let i = 1; i < k; i++)
    {
        target = arrIndexPlusOne(target);
    }

    return target;
};


console.log(shiftGrid([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 9));
