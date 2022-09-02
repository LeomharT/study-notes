//实现一个打点计时器;
/*
  1.从start至end,每隔100毫秒console.log一个数字，每次数字增幅为1
  2.返回的对象中需要包含一个cancel方法，用于停止定时操作
  3.第一个数字需要立即输出
*/
class Timer
{
    constructor()
    {
        console.log(this.num);
        this.timer = setInterval(() =>
        {
            this.num += 1;
            console.log(this.num);
        }, 100);
    }
    ClearTimer = () =>
    {
        clearInterval(this.timer);
    };
    timer: NodeJS.Timer;
    num: number = 1;
}



const t = new Timer();

setTimeout(() =>
{
    t.ClearTimer();
}, 3000);
