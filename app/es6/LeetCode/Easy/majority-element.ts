function majorityElement(nums: number[]): number
{
    const memo: Map<number, number> = new Map<number, number>();
    for (let n of nums)
    {
        if (memo.has(n))
        {
            let v = memo.get(n) as number;
            memo.set(n, ++v);
        } else
        {
            memo.set(n, 1);
        }
    }

    const result = [...memo].sort((a, b) => b[1] - a[1]);
    console.log(result);
    return result[0][1];
};




console.log(majorityElement(
    [3, 2, 3]));
