function maxSubArray(nums: number[]): number
{
    if (nums.length === 1) return nums[0];

    let sum = 0;

    //必须返回最小
    let result = -Infinity;

    for (let n of nums)
    {
        sum += n;

        result = Math.max(result, sum);

        if (sum < 0) sum = 0;
    }

    return result;
};


console.log(maxSubArray([5, 4, -1, 7, 8]));
