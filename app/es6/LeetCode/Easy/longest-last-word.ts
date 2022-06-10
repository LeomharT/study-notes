function lengthOfLastWord(s: string): number
{
    s = s.replace(/( )\1+/g, '$1').trimStart().trimEnd();

    console.log(s);

    const words = s.split(" ");

    return words[words.length - 1].length;
};


console.log(lengthOfLastWord("Today is a nice day"));
