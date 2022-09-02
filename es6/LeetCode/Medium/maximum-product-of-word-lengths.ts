function maxProduct(words: string[]): number
{
    if (words.length === 0) return 0;

    words = words.sort((a, b) => b.length - a.length);

    let result: string[] = [];

    let word: string = words[0];


    for (let i = 1; i < words.length; i++)
    {
        let w = words[i];

        for (let s of w)
        {
            if (word.includes(s))
            {
                break;
            } else
            {
                result.push(word);
            }
        }

        word = w;
    }



    result = [...new Set(result)];

    console.log(words);
    console.log(result);

    if (result.length)
    {
        return result[0].length * result[1].length;
    }
    return 0;
};


console.log(maxProduct(["a", "ab", "abc", "d", "cd", "bcd", "abcd"]));
