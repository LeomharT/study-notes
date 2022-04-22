function isMatch(s: string, p: string): boolean
{
    const reg = new RegExp(`^${p}$`, 'g');
    return reg.test(s);
};


console.log(isMatch('aa', 'a*'));
