async function Sleep(time)
{
    return new Promise(reslove =>
    {
        setTimeout(reslove, time);
    });
}

Sleep(2000);

console.log(1);
