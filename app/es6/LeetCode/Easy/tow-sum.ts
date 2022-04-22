function twoSum(nums: number[], target: number): number[]
{
    const result: number[] = [];
    nums.map((v, index) =>
    {
        for (let i = index; i < nums.length - 1; i++)
        {
            if (v + nums[i + 1] === target) result.push(index, i + 1);
        }
    });

    console.log([...new Set([...result]).values()]);

    return result;
};




console.log(twoSum([2, 7, 2, 15], 9));
