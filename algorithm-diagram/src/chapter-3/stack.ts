function fact(x: number): number
{
    if (x === 1) return 1;
    /**
     * x=1时返回的是1
     * x=2的那个递归就会返回2*1
     * x=3的那个递归就会返回3*2
     * x=4的那个递归就会返回4*6
     * ...
     *
     * 在栈内可以想象为砌砖
     * x=1时从最顶上弹出内存
     */
    else return x * fact(x - 1);
}


console.log(fact(5));
