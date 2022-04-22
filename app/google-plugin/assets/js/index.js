/**
 *  ✨antd.Button是对象啊,不是原始Element类型谢谢!✨
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

    let TransLateRoot = document.createElement('div');
    TransLateRoot.id = 'TransLateRoot';
    TransLateRoot.setAttribute('data-desc', 'This is Extension Root');
    document.body.appendChild(TransLateRoot);


    const PopoverCard = document.createElement('div');
    PopoverCard.id = "PopoverCard";
    PopoverCard.classList.add('PopoverCard');
    TransLateRoot.appendChild(PopoverCard);

    const AudioPlayer = document.createElement('audio');
    AudioPlayer.id = 'TranslateAudioPlayer';
    TransLateRoot.appendChild(AudioPlayer);


});

const PalyPopoverTranslateAudio = async (e, trans_word) =>
{
    const Audio = document.getElementById('TranslateAudioPlayer');
    const { access_token } = await (await (fetch(RequestURL.BaiduYunToken))).json();
    //utf-8转码
    const word = encodeURI(encodeURI(trans_word));
    const audioURL = `https://tsn.baidu.com/text2audio?tex=${word}&lan=zh&cuid=3de3824071b448a59003b0d995b64155&ctp=1&tok=${access_token}&spd=${"zh" === "en" ? '3' : '5'}&aue=3&per=1&vol=9`;

    Audio.src = audioURL;
    Audio.play();
};


document.addEventListener('mouseup', async (e) =>
{
    const Card = document.getElementById('PopoverCard');

    const isClickOnPopoverCard =
        e.target.id === 'PopoverCard' || e.target.id === 'PopoverCardContent' ||
        e.target.id === 'OriAudioBtn' || e.target.id === 'TransAudioBtn';

    let content = window.getSelection()?.toString();


    if (!isClickOnPopoverCard)
    {
        Card.style.opacity = 0;
        Card.style.transform = 'scale(.5)';
    }

    if (content !== '' && content.length <= 20)
    {
        Card.style.opacity = 0;
        Card.style.transform = 'scale(.5)';

        let res = await fetch(`${RequestURL.TranslateResult}?trans_word=${content}`);

        const result = await res.json();

        Card.style.opacity = 1;
        Card.style.transform = 'scale(1)';
        Card.style.left = (e.clientX - Card.clientWidth / 2) + 'px';
        //✨新的pageY不需要自己加了✨
        Card.style.top = (e.pageY - Card.clientHeight - 20) + 'px';

        if (result.error)
        {
            Card.innerText = '内容出错';
        } else
        {
            const { tag } = result?.liju_result;
            if (tag)
            {
                Card.innerText = "同义:" + tag.join(';');
            } else
            {
                Card.innerText = '暂无查询数据';
            }

            const { dst } = result.trans_result.data[0];

            let p = document.createElement('p');
            p.id = 'PopoverCardContent';
            p.insertAdjacentHTML('afterbegin', `
                <span>原:</span>${content} <button id='OriAudioBtn'>🔊</button>;
                <span>译:</span>${dst} <button id='TransAudioBtn'>🔊</button>
            `);
            Card.appendChild(p);

            const btnOri = document.getElementById('OriAudioBtn');
            const btnTransLate = document.getElementById('TransAudioBtn');

            btnOri.onmousedown = e => window.getSelection().removeAllRanges();
            btnTransLate.onmousedown = e => window.getSelection().removeAllRanges();

            btnOri.onclick = e => PalyPopoverTranslateAudio(e, content);
            btnTransLate.onclick = e => PalyPopoverTranslateAudio(e, dst);
        }
    }
});
