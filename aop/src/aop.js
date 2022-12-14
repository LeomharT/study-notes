"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionName = exports.end = exports.begin = exports.iaop = void 0;
const type_1 = require("./type");
//aop注入数据的缓存
let aopMap = new WeakMap();
/**
 * 保存被注入的函数列表
 */
class AopData
{
    //函数开始执行时的调用函数列表
    _Begin = [];
    //函数结束执行时调用的函数列表
    _Ending = [];
}
/**
 * 函数调用
 * @param {Function[]} funcList 函数列表
 * @param {Object} object 源对象
 * @param {any} args 参数列表
 */
function functionCall(funcList, object, ...args)
{
    for (let f of funcList)
    {
        if (f.call(object, ...args)) //如果函数返回true 那么结束注入.
            return;
    }
}
/**
 * 全局注入装饰器.
 * @param {Object} target 目标类
 * @param {(string | symbol)} propertyKey 装饰key
 * @param {any} [descriptor] 描述
 */
function iaop(target, propertyKey, descriptor)
{
    //声明注入数据
    let injectData = new AopData();
    //缓存旧的函数
    let _oldFunc;
    //构建新的函数
    let newFunction = function (...args)
    {
        //调用起始注入的函数列表
        functionCall(injectData._Begin, this, ...args);
        //调用原始的函数
        let res = _oldFunc.call(this, ...args);
        //将原始结果加入到参数列表中
        args.push(res);
        //调用结束的注入
        functionCall(injectData._Ending, this, ...args);
        return res;
    };
    if (!descriptor)
    {
        let getter = function ()
        {
            if (typeof _oldFunc == "function")
                return newFunction; //包装注入
            else
            {
                console.error("错误:iaop装饰器只能用于函数");
                return _oldFunc;
            }
        };
        let setter = function (newVal)
        {
            _oldFunc = newVal;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    }
    else
    {
        _oldFunc = descriptor.value;
        descriptor.value = newFunction;
    }
    aopMap.set(newFunction, injectData);
}
exports.iaop = iaop;
/**
 * 返回注入方法.
 */
function Inject(injectType)
{
    function injectAll(func, injectFunction)
    {
        if (!aopMap.has(func))
        {
            console.error("错误:注入失败!无法全局注入该函数,因为该函数没有@iaop");
            return;
        }
        let data = aopMap.get(func);
        let farr;
        switch (injectType)
        {
            case type_1.InjectType.begin:
                farr = data._Begin;
                break;
            case type_1.InjectType.end:
                farr = data._Ending;
                break;
            default:
                break;
        }
        farr.unshift(injectFunction);
        if (farr.length > 20)
            console.warn("警告:aop注入函数个数超过20!请检查注入是否正常销毁!", injectFunction);
        return function ()
        {
            let index = farr.indexOf(injectFunction);
            if (index != -1)
                farr.splice(index, 1);
        };
    }
    function injectObject(obj, func, injectFunction)
    {
        let name = getFunctionName(obj, func);
        let beginName = getInjectFunctionArrayName(name, injectType);
        initInjectReplace(obj, name);
        let functionArr = initInjectFunctionArray(obj, beginName);
        functionArr.unshift(injectFunction);
        if (functionArr.length > 20)
            console.warn("aop注入函数个数超过20", injectFunction);
        return function ()
        {
            let index = functionArr.indexOf(injectFunction);
            if (index != -1)
                functionArr.splice(index, 1);
        };
    }
    return function inject(...args)
    {
        if (args.length === 2)
            return injectAll.call(this, ...args);
        else if (args.length === 3)
            return injectObject.call(this, ...args);
    };
}
exports.begin = Inject(type_1.InjectType.begin);
exports.end = Inject(type_1.InjectType.end);
/**
 * 获得注入的函数名称.
 */
function getInjectFunctionArrayName(name, type)
{
    return type + name;
}
/**
 * 初始化注入.
 */
function initInjectFunctionArray(obj, funcName)
{
    if (!obj.hasOwnProperty(funcName))
        obj[funcName] = [];
    return obj[funcName];
}
function callFunctionArray(thisArg, name, ...args)
{
    let funcList = thisArg[name];
    if (funcList)
        functionCall(funcList, thisArg, ...args);
}
function callInjectFunctionList(target, funcName, type, ...args)
{
    callFunctionArray(target, getInjectFunctionArrayName(funcName, type), ...args);
}
/**
 * 初始化注入
 *
 * @param {Object} target 目标对象
 * @param {string} funcName 目标函数
 */
function initInjectReplace(target, funcName)
{
    const key = Symbol.for("__aopinit__" + funcName);
    if (!target.hasOwnProperty(key))
    {
        target[key] = true;
        let oldFunction = target[funcName];
        target[funcName] = function (...args)
        {
            callInjectFunctionList(target, funcName, type_1.InjectType.begin, ...args);
            let res = oldFunction.call(target, ...args);
            args.push(res);
            callInjectFunctionList(target, funcName, type_1.InjectType.end, ...args);
            return res;
        };
    }
}
/**
 * 返回函数的名称.稳妥起见,你应该传入 {class}.prototype.{function}
 */
function getFunctionName(target, func)
{
    if (func.name)
        return func.name;
    for (let key in target)
        if (target[key] == func)
            return key;
}
exports.getFunctionName = getFunctionName;
//# sourceMappingURL=lib.js.map
