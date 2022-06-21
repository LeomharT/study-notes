const width: number = 1680;
const height: number = 640;
function GetSquare(width: number, height: number): any
{
    console.log(width, height);

    if (width === height) return { width, height };

    if (width > height)
    {
        return GetSquare(width - height, height);
    } else
    {
        return GetSquare(width, height - width);
    }
}

function sum(numbers: number[]): number
{
    if (!numbers) return 0;

    if (numbers.length === 1) return numbers[0];

    return numbers.pop() as number + sum(numbers);
}
