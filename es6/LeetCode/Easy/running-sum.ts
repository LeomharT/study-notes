function runningSum(nums: number[]): number[]
{
    const result: number[] = [];

    const sum = nums.reduce((prve: number, curr: number, index: number) =>
    {
        result.push(prve);
        return prve += curr;
    });

    result.push(sum);


    return result;
};

console.log(runningSum([3, 1, 2, 10, 1]));
