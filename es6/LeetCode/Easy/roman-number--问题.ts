const configRoman: { [index: string]: any; } = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
};
const configRoman_edge: { [index: string]: any; } = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,
};

function romanToInt(s: string): number
{
    const keys = Object.keys(configRoman_edge).join('|');
    const edgeReg = new RegExp(keys, 'g');

    let result: number = 0;

    let regResult: RegExpExecArray | null = edgeReg.exec(s);

    while (regResult)
    {
        result += configRoman_edge[regResult[0]];

        regResult = edgeReg.exec(s);
    }

    s = s.replace(/(IV)|(IX)|(XL)|(XC)|(CD)|(CM)/g, '');
    for (let str of s.split(''))
    {
        result += configRoman[str];
    }

    return result;
};



console.log(romanToInt("MCMXCIV"));
