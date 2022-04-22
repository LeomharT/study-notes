const numberOfArithmeticSlices = (num: number[]): number =>
{
    const n = num.length;
    if (n < 3) return 0;

    let diff = num[0] - num[1];
    let t = 0;
    let ans = 0;

    for (let i = 2; i < n; i++)
    {
        if (num[i - 1] - num[i] === diff)
        {
            t++;
        } else
        {
            diff = num[i - 1] - num[i];
            t = 0;
        }
        ans += t;
    }
    return ans;
};




console.log(numberOfArithmeticSlices([1, 2, 3, 4, 5, 6, 7]));
