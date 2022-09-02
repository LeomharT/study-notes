const IsSubsequence = (s: string, t: string) =>
{
    let index: number = 0;
    for (let str of t)
    {
        if (s.charAt(index) === str) index++;
    }
    return index === s.length;
};


console.log(IsSubsequence('abc', 'asbwwqc'));
