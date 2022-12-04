import cheerio from 'cheerio';
import fetch from 'node-fetch';

// const web = await (await fetch('https://mui.com/material-ui/react-autocomplete/')).text();

// const $ = cheerio.load(web);

// const component_list = $('.MuiList-root li:nth-child(2) .MuiList-root li');

// const mui: any = {};

// //@ts-ignore
// component_list.each((i: number, element) =>
// {
//     const text = $(element).text();

//     console.log(text);

// });


const web_mantine = await (await fetch('https://mantine.dev/core/app-shell/')).text();
const $ = cheerio.load(web_mantine);


const component_list = $('.mantine-uitvrg a');

component_list.each((i, e) =>
{
    const text = $(e).text();

    console.log(text);
});
