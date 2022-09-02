function divide(dividend: number, divisor: number): number
{
    const quotient = dividend / divisor;

    if (quotient < 0)
    {
        return Math.max(Math.pow(-2, 31), Math.ceil(quotient));
    }

    return Math.min(Math.pow(2, 31) - 1, Math.floor(quotient));
};



console.log(divide(-2147483659, -1));
