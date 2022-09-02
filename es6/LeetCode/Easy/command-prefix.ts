function getCommon(strs: string[])
{
    let prefix: string = '';

    const prefixList: string[] = [];

    strs.reduce((prve: string, curr: string, index: number) =>
    {
        for (let i = 0; i < prve.length; i++)
        {
            if (prve.charAt(i) === curr.charAt(i))
            {
                prefix += prve.charAt(i);
            } else
            {
                break;
            }
        }
        prefixList.push(prefix);
        prefix = '';
        return curr;
    });
    return prefixList;
}


function longestCommonPrefix(strs: string[]): string
{
    if (strs.length === 0) return '';

    if (strs.length === 1) return strs[0];

    let r = getCommon(strs);

    while (r.length > 1)
    {
        r = getCommon(r);
    }

    return r.join('');
};


console.log(longestCommonPrefix(["flower", "flower", "flower", "flower"]));
