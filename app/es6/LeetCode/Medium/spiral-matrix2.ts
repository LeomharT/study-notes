function generateMatrix(n: number): number[][]
{
    //这里四个值是矩阵边界,就是四个顶点的位置,如果我超过了就要换个方向
    let top = 0;
    let bottom = n - 1;
    let left = 0;
    let right = n - 1;

    const result = Array.from(Array(n), () => Array(n).fill(0));
    let val: number = 1;

    while (val <= n * n)
    {
        //GO 👉
        //第一行按顺序存入到右边界为止;
        for (let i = left; i <= right; i++)
        {
            result[top][i] = val;
            val++;
        }
        //完成第填充后需要去除掉已经写好的行;可以看作矩阵向下压;
        top++;

        //Go 👇
        //之后需要填充最右边的列,从上到下,但是去除掉第一行,因为第一行已经完成了;
        for (let i = top; i <= bottom; i++)
        {
            result[i][right] = val;
            val++;
        }
        //矩阵向左缩一列;
        right--;

        //GO 👈
        //然后填充最后一行,从右到左;因为上面最右列已经右值所以去掉;
        for (let i = right; i >= left; i--)
        {
            result[bottom][i] = val;
            val++;
        }
        //矩阵向上缩一行;
        bottom--;

        //Go 👆
        //最后填充最左列;从下到上
        for (let i = bottom; i >= top; i--)
        {
            result[i][left] = val;
            val++;
        }
        //矩阵向右缩;
        left++;

    } //之后的循环重复上述动作😊
    return result;
};

console.log(generateMatrix(4));
