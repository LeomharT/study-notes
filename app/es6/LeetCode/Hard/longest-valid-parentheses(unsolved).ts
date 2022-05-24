function longestValidParentheses(str: string): number
{
    const openTags: string[] = [];

    let result: number = 0;
    for (let s of str)
    {
        if (s === '(')
        {
            openTags.push(s);

        } else if (s === ')' && openTags.length !== 0 && openTags[openTags.length - 1] === '(')
        {
            result += 2;
            openTags.pop();
        } else
        {
            continue;
        }
    }
    return result;
};

console.log(longestValidParentheses("())((())))"));
