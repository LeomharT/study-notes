function findMedianSortedArrays(nums1: number[], nums2: number[]): number
{
    const arr = [...nums1, ...nums2].sort((a, b) => a - b);

    const midian = arr.length / 2 | 0;

    let result: number = 0;

    if (arr.length % 2)
    {
        result = arr[midian];
    } else
    {
        result = (arr[midian] + arr[midian - 1]) / 2;
    }

    return result;
};





console.log(findMedianSortedArrays([], [3, 2]));
