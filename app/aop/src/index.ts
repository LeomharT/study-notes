'use strict';
const dataCache = new WeakMap<Object, AopData>();

class AopData
{
    beginFunList: Function[] = [];
    endFunList: Function[] = [];
}

function CallAllFunction(funList: Function[], target: Object, ...args: any[])
{
    for (let f of funList)
    {
        if (f.call(target, ...args)) return;
    }
};
