function climbStairs(n: number): number
{
    let [stepOne, stepTwo] = [0, 1];
    for (let i = 1; i <= n; i++)
    {
        let temp = stepTwo;
        stepTwo = stepOne + stepTwo;
        stepOne = temp;
    }
    return stepTwo;

};


console.log(climbStairs(1));
