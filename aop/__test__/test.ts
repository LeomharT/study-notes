class InjectFunctionList
{
    beginFunctionList: Function[] = [];
    endFunctionList: Function[] = [];
}


const aopWeakMap: WeakMap<object, InjectFunctionList> = new WeakMap();

const function_list = new InjectFunctionList();


function callFunctionList(funcList: Function[], target: object, ...args: any[])
{
    for (const f of funcList)
    {
        if (f.call(target, ...args)) return;
    }
}


function makeAop(target: (...args: any[]) => any): (...args: any[]) => any
{
    const returnFunction = (...args: any[]) =>
    {
        callFunctionList(function_list.beginFunctionList, globalThis, ...args);

        const result = target.call(globalThis, ...args);

        if (result) args.unshift(result);

        callFunctionList(function_list.endFunctionList, globalThis, ...args);
    };

    aopWeakMap.set(returnFunction, function_list);

    return returnFunction;
};

function begin(target: (...args: any[]) => any, beginFunction: (...args: any[]) => any)
{
    if (!aopWeakMap.has(target))
    {
        console.warn(target.name + 'This function is not aop function');

        return;
    }
    aopWeakMap.get(target)?.beginFunctionList.push(beginFunction);
}

function end(target: (...args: any[]) => any, endFunction: (...args: any[]) => any)
{
    if (!aopWeakMap.has(target))
    {
        console.warn(target.name + 'This function is not aop function');

        return;
    }
    aopWeakMap.get(target)?.endFunctionList.push(endFunction);
}

const test = makeAop((a: string) =>
{
    console.log(a);
    return { name: '妈妈' };
});


end(test, (...args: any[]) =>
{
    console.log(args);
});

test('牛逼');
