function removeElement(nums: number[], val: number): number
{
    const temp = nums.filter(v => v !== val);

    nums.length = 0;

    nums.push(...temp);

    return nums.length;
};



removeElement([3, 2, 2, 3], 3);
