export default class Debounce
{
    timer: NodeJS.Timer | undefined;
    exeFun: Function | undefined;
    Debounce(fun: Function, time: number)
    {
        this.exeFun = fun;

        //保障函数不会堆积
        if (this.timer) clearTimeout(this.timer);

        this.timer = setTimeout(() =>
        {
            if (this.exeFun)
            {
                this.exeFun();
                this.exeFun = undefined;
            }
            this.timer = undefined;
        }, time);
    }
}



const d = new Debounce();


d.Debounce(() => console.log(10), 1000);
