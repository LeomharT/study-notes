const config = {
    CN_Num: '零壹贰叁肆伍陆柒捌玖'.split(''),
    CN_Unit: ['', '拾', '佰', '仟'],
    CN_Level: ['', '万', '亿', '兆'],
};

const NumToStrArr = (num: string | number) =>
{
    const numbers = Number(num).toFixed(2).split('.');

    const integer = numbers[0].split('');

    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split('');

    return { integer, decimal };
};

const ToChineseNumber = (num: string | number) =>
{
    const { integer: _integer, decimal: _decimal } = NumToStrArr(num);

    let levels = _integer.reverse().reduce((prve: string[][], curr: string, index: number) =>
    {
        let level = prve[0] && prve[0].length < 4 ? prve[0] : [];

        let value = curr === '0' ? config.CN_Num[Number(curr)] : config.CN_Num[Number(curr)] + config.CN_Unit[index % 4];

        level.unshift(value);
        if (level.length === 1)
        {
            prve.unshift(level);
        } else
        {
            prve[0] = level;
        }
        return prve;
    }, []);
    let integer = levels.reduce((prve: string, curr: string[], index: number) =>
    {
        let unit = config.CN_Level[levels.length - 1 - index];

        let value = curr.join('').replace(/(零)\1+/g, '$1');

        if (value === '零')
        {
            unit = '';
            value = '';
        }
        if (value.charAt(value.length - 1) === '零')
        {
            value = value.slice(0, value.length - 1);
        }
        return prve + value + unit;
    }, '');

    let decimal = _decimal.map((v, index) =>
    {
        const _unit = ['分', '角'];

        const unit = _unit[_decimal.length - 1 - index];

        let value = v === '0' ? config.CN_Num[Number(v)] : config.CN_Num[Number(v)] + unit;
        return value;
    }).join('');
    if (decimal.charAt(decimal.length - 1) === '零') decimal = decimal.slice(0, decimal.length - 1);
    return `${integer}${decimal || '整'}`;
};



console.log(ToChineseNumber(6250011.08));
