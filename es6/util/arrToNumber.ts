export default function arrToNumber(arr: number[]): number
{
    if (!arr.length) return 0;

    let decimal = arr.length - 1;

    return arr.reverse().reduce((prve: number, v: number) =>
    {
        return prve + v * Math.pow(10, decimal--);
    }, 0);
}
