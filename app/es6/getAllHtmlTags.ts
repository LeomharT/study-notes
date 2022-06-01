import { load } from 'cheerio';
import fetch from 'node-fetch';

// request('https://www.amazon.cn', (err, res, body) =>
// {
//     if (err) throw new Error(err);

//     const $ = cheerio.load(body);

//     //@ts-ignore
//     const tags = Array.from($('*')).map(t => t.tagName);

//     const set = new Set(tags);

//     const mostTag = MostTag(tags);
//     console.table(mostTag.splice(0, 3));

// });
const MostTag = (tags: string[]) =>
{
    let memo = {} as { [index: string]: number; };
    for (let t of tags)
    {
        if (memo[t])
        {
            memo[t] += 1;
        } else
        {
            memo[t] = 1;
        }
    }
    return Object.entries(memo).sort((a, b) => b[1] - a[1]);
};


const FetchTags = async () =>
{
    let res = await fetch('https://www.kujiale.cn/pub/dtpl/home?kpm=qkWL.53f34adc0cc0bf09.f26edf1.1651709316842');

    const $ = load(await res.text());

    //@ts-ignore
    let tags = Array.from($('*')).map(t => t.tagName);

    let mostTag = MostTag(tags);

    console.table(mostTag.splice(0, 3));
};


FetchTags();
