var removeDuplicates = function (nums: number[]): number
{
    nums.sort((a, b) => a - b);

    let temp = [...new Set([...nums])];
    nums.length = 0;
    nums.push(...temp);
    console.log(nums);
    return nums.length;
};



console.log(removeDuplicates([1, 1, 2]));
