/**
 *  ✨antd.Button是对象啊,不是原始Element类型谢谢!✨xe
 */

const HOST = 'https://47.107.42.46:626';

const RequestURL = {
    trans_word: HOST + '/TransWord',
    trans_voice: HOST + '/TransVoice',
};

const audioIcon = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
<path d="M3464 4906 c-87 -38 -116 -165 -52 -233 12 -13 86 -57 163 -96 365 -188 645 -436 869 -772 273 -409 405 -914 368 -1405 -24 -313 -89 -555 -227 -835 -220 -449 -556 -789 -1010 -1022 -77 -39 -151 -83 -163 -96 -65 -69 -35 -196 54 -233 58 -24 88 -17 245 62 256 130 466 283 666 486 216 219 359 422 488 690 336 700 338 1503 5 2205 -131 275 -274 478 -493 701 -200 203 -410 356 -666 486 -158 79 -189 87 -247 62z"/>
<path d="M2512 4547 c-18 -6 -298 -207 -622 -444 l-590 -433 -598 0 -599 0 -34 -23 c-74 -49 -69 23 -69 -1087 0 -1110 -5 -1038 69 -1087 l34 -23 599 0 598 0 593 -435 c369 -271 606 -439 630 -445 77 -22 168 34 182 112 3 18 4 875 3 1905 l-3 1872 -21 27 c-46 63 -109 85 -172 61z m-104 -2761 l-3 -774 -489 358 c-269 198 -496 362 -505 367 -9 4 -262 9 -563 11 l-548 3 0 809 0 809 548 3 c301 2 554 7 563 11 9 5 236 169 505 367 l489 358 3 -774 c1 -426 1 -1122 0 -1548z"/>
<path d="M3485 3783 c-52 -13 -100 -70 -105 -123 -6 -69 -1 -80 85 -171 115 -124 175 -205 239 -330 199 -382 199 -816 0 -1198 -64 -124 -127 -211 -236 -327 -88 -92 -104 -128 -86 -192 13 -45 66 -97 109 -106 79 -15 150 34 289 199 333 397 450 924 320 1433 -54 212 -173 442 -320 617 -148 175 -212 218 -295 198z"/>
</g>
</svg>`;

class Debounce
{
    Debounce(fun, time)
    {
        this.exeFun = fun;

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

    const { left, width, top } = window.getSelection().getRangeAt(0)?.getBoundingClientRect();

    popover.style.left = left + ((width / 2) - (popover.clientWidth / 2)) + 'px';

    popover.style.top = (window.scrollY) + top - popover.clientHeight - 15 + 'px';

    popover.style.opacity = 1;
    popover.style.transform = 'scale(1)';
};


async function PlayTTS(audio, trans_word)
{
    const res = await fetch(RequestURL.trans_voice + `?trans_word=${trans_word}`);

    const url = window.URL.createObjectURL(await res.blob());

    audio.src = url;

    audio.play();
}


document.addEventListener('mouseup', async (e) =>
{
    const popover = document.querySelector('#trans-popover');

    const audio = document.querySelector('#trans-audio');

    const selected_text = window.getSelection().toString().trim();

    if (!selected_text || selected_text === '' || selected_text.length > 20)
    {
        HidePopover(popover);
        return;
    }

    if (!popover) return;

    if (popover.contains(e.target)) return;

    let trans_result = await (await fetch(RequestURL.trans_word + `?trans_word=${selected_text}`)).json();

    const [translate, origin_word] = [trans_result[0][0][0], trans_result[0][0][1]];

    popover.innerHTML = '';

    popover.insertAdjacentHTML('afterbegin', `
        <p>原:${origin_word} <button id='origin_btn'>${audioIcon}</button></p>
        <p>译:${translate} <button id='translate_btn'>${audioIcon}</button></p>
    `);

    const d = new Debounce();

    const origin_btn = document.getElementById('origin_btn');
    origin_btn.onclick = async (e) =>
    {
        d.Debounce(async () => await PlayTTS(audio, origin_word), 200);

    };

    const translate_btn = document.getElementById('translate_btn');
    translate_btn.onclick = async (e) =>
    {
        d.Debounce(async () => await PlayTTS(audio, translate), 200);
    };

    ShowPopover(popover, e);
});
