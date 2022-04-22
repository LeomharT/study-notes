// 给两个数组 [A1,A2,B1,B2,C1,C2,D1,D2] [A,B,C,D]
// 输出 [A1,A2,A,B1,B2,B,C1,C2,C,D1,D2,D]


const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
const arr2 = ['A', 'B', 'C', 'D'];

let newArr = arr1.reduce((prve: string[], curr: string, index: number) =>
{
    if (index % 2 === 0 && index !== 0)
    {
        prve.push(arr2[index / 2 - 1]);
    }

    return prve.concat(curr);
}, []).concat(arr2[arr2.length - 1]);


console.log(newArr);
