/**
 *  ✨antd.Button是对象啊,不是原始Element类型谢谢!✨xe
 */

const RequestURL = {
    TranslateResult: 'https://aliyun:3065/GoogleExtensionTranslate',
    TranslateLan: 'https://aliyun:3065/GoogleExtensionTranslateLan',
    BaiduYunToken: 'https://aliyun:3065/BaiduYunToken',
};



window.addEventListener('load', e =>
{
    //这个meta会主动将http请求变为https
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = 'upgrade-insecure-requests';

    document.head.appendChild(meta);

    const root = document.createElement('div');
    root.id = 'translate-root';
    root.setAttribute('data-desc', 'This is extension root');
    document.body.appendChild(root);


    const popover = document.createElement('div');
    popover.id = "trans-popover";
    root.appendChild(popover);

    const audio = document.createElement('audio');
    audio.id = 'trans-audio';
    root.appendChild(audio);
});

function HidePopover(popover)
{
    if (!popover) return;
    popover.style.opacity = 0;
    popover.style.transform = 'scale(.5)';
};
function ShowPopover(popover, e)
{
    HidePopover(popover);

    const { left, width, top } = window.getSelection().getRangeAt(0).getBoundingClientRect();

    popover.style.left = left + ((width / 2) - (popover.clientWidth / 2)) + 'px';

    popover.style.top = (window.scrollY) + top - popover.clientHeight - 15 + 'px';

    popover.style.opacity = 1;
    popover.style.transform = 'scale(1)';
};

document.addEventListener('mouseup', async (e) =>
{
    const popover = document.querySelector('#trans-popover');

    const audio = document.querySelector('#trans-audio');

    const selected_text = window.getSelection().toString();


    if (!selected_text || selected_text === '' || selected_text.length > 20)
    {
        HidePopover(popover);
        return;
    }
    if (!popover) return;

    popover.innerHTML = window.getSelection().toString();

    ShowPopover(popover, e);






    console.log(selected_text);
});
