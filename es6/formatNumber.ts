const FormateNumber = (num: string | number) =>
{
    num = Number(num).toFixed(2);

    const numbers = num.split('.');

    const integer = numbers[0].split('').reverse().reduce((prve, curr, index) =>
    {
        let str = prve;

        if (index % 3 === 0 && index !== 0)
        {
            str += ',';
        }
        return str + curr;
    }, '').split('').reverse().join('');

    return integer + '.' + numbers[1];
};

console.log(FormateNumber(6252525.10));
