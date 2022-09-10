import fetch from 'node-fetch';

const res = await fetch('https://tieba.baidu.com/p/7980597898');

console.log(await res.text());
