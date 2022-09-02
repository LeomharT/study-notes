function strStr(haystack: string, needle: string): number
{
    if (needle === '') return 0;

    if (haystack.includes(needle))
        return (haystack.indexOf(needle));

    return -1;
};



console.log(strStr('hello', 'll1'));
