function searchInsert(nums: number[], target: number): number
{
    if (nums.includes(target)) return nums.indexOf(target);

    let index = 0;
    for (let n of nums)
    {
        if (n > target) break;
        index++;
    }

    return index;
};



console.log(searchInsert([1, 3, 5, 6], 7));
