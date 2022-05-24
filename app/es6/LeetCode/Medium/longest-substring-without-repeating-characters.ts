function lengthOfLongestSubstring(str: string): number
{
    if (str === '') return 0;

    let sub: string = '';

    let subArr: string[] = [];

    for (let i = 0; i < str.length; i++)
    {
        for (let j = i; j < str.length; j++)
        {
            if (sub.includes(str.charAt(j)))
            {
                subArr.push(sub);
                sub = '';
                break;
            }
            sub += str.charAt(j);
        }
    }
    subArr.push(sub);
    subArr.sort((a, b) => b.length - a.length);
    return subArr[0].length;
};


console.log(lengthOfLongestSubstring("asjrgapa"));
