/**
 * 二分查找 或者叫折半算法
 *
 * 1.二分查找必须排序
 *
 *
 */

function searchNum(targer: number): boolean
{
    let low: number = 0;

    let height: number = 4000000000;

    //只要大于一个元素
    while (low <= height)
    {
        //中值才是我的猜测
        const middle: number = Math.ceil((low + height) / 2);

        if (targer === middle) return true;

        if (middle < targer) low = middle + 1;
        else height = middle - 1;
    }
    return false;
    // for (let i = low; i <= height; i++)
    // {
    //     if (targer === i) return true;
    // }

    // return false;
}

console.time();
console.log(searchNum(3999999999));
console.timeEnd();

/**
 * Practice
 *
 * 1.二分查找长度为128的序列,最多需要几步?
 *
 *  log2(128) = 7
 *
 * 2.长度翻倍最多需要几步?
 *
 *  log2(256) = 8
 */
