function minRemoveToMakeValid(s: string): string
{
    const result = s.split('').reduce((prve: string, curr: string, index: number) =>
    {
        prve += curr;

        return prve;
    }, '');

    return result;
};




console.log(minRemoveToMakeValid("lee(t(c)o)de)"));
