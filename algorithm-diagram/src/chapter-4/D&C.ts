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


function _length(numbers: number[]): number
{
    if (numbers.length === 1) return 1;

    numbers.pop();

    return 1 + _length(numbers);
}


function quickSort(numbers: number[]): number[]
{
    if (numbers.length < 2) return numbers;

    //基准值是几其实不重要
    const pivolt = numbers[0];

    const less: number[] = [];

    const greater: number[] = [];

    for (let i of numbers)
    {
        if (i <= pivolt) less.unshift(i);

        if (i > pivolt) greater.unshift(i);
    }

    const result = quickSort(less).concat(pivolt).concat(quickSort(greater));

    return result;
}

// console.log(quickSort([2, 3, 1, 5, 8, 4, 6, 9, 7]));


function fn1()
{
    let a = 1;
    return function ()
    {
        return a++;
    };
}
const x = fn1();

console.log(x());
console.log(x());
console.log(x());
console.log(x());
console.log(x());
