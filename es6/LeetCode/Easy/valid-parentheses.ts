function isValid(str: string): boolean
{
    if (str.length % 2 !== 0) return false;

    const openTags: string[] = [];
    for (let s of str)
    {
        if (s === '(' || s === '[' || s === '{')
        {
            openTags.push(s);
        } else if (s === ')' && openTags.length !== 0 && openTags[openTags.length - 1] === '(')
        {
            openTags.pop();
        } else if (s === ']' && openTags.length !== 0 && openTags[openTags.length - 1] === '[')
        {
            openTags.pop();
        } else if (s === '}' && openTags.length !== 0 && openTags[openTags.length - 1] === '{')
        {
            openTags.pop();
        } else
        {
            return false;
        }
    }

    return openTags.length === 0;
};

function isValid2(str: string): boolean
{
    const paire: Map<string, string> = new Map<string, string>([
        [')', '('],
        [']', '['],
        ['}', '{'],
    ]);

    const openTags: string[] = [];

    for (let s of str)
    {
        if (paire.has(s))
        {
            //如果栈内为空就说明闭标签在开标签前面直接返回false即可
            if (openTags.length === 0 || openTags[openTags.length - 1] !== paire.get(s))
            {
                return false;
            }
            openTags.pop();
        } else
        {
            openTags.push(s);
        }
    }

    return openTags.length === 0;
}




console.log(isValid2('()[]{}'));
