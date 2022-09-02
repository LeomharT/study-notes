export default class Debounce
{
    timer: NodeJS.Timeout | null = null;

    exeFun: Function | null = null;

    Debounce = (fun: () => any, time: number) =>
    {
        this.exeFun = fun;

        if (this.timer) window.clearTimeout(this.timer);

        this.timer = setTimeout(() =>
        {
            if (this.exeFun)
            {
                this.exeFun();
                this.exeFun = null;
            }
            this.timer = null;
        }, time);
    };
}
