export function GetLanguage(trans_word: string): boolean
{
    return /[\u4E00-\u9FA5]+/g.test(trans_word.trim());
}

export function GetXTime(): string
{
    return new Date().toISOString();
};
