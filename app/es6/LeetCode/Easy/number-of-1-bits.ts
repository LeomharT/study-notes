function hammingWeight(n: number): number
{
    return n.toString(2).split('').filter(v => v == '1').length;
};

console.log(hammingWeight(parseInt('00000000000000000000000000001011')));
