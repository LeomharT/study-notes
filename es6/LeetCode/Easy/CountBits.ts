//Solution 1
const ToBinary = (num: number) =>
{
    const binary: number[] = [];
    while (num > 0)
    {
        binary.unshift(num % 2);
        num = num / 2 | 0;
    }
    return binary;
};
const CountBit = (num: number) =>
{
    const result: number[] = [];
    for (let i = 0; i <= num; i++)
    {
        const binary = ToBinary(i);

        result.push(binary.filter(v => v === 1).length);
    }

    return result;
};
console.log(CountBit(10));
//Solution 2

const GetMember = (num: number): number =>
{
    let binary: number = 0;
    while (num > 0)
    {
        binary++;
        num &= (num - 1);
    }

    return binary;
};
const CountBit2 = (num: number) =>
{
    let result: number[] = [];
    for (let i = 0; i <= num; i++)
    {
        const length = GetMember(i);
        result.push(length);
    }
    return result;
};
console.log(CountBit2(10));
