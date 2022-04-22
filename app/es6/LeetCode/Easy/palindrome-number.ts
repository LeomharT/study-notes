function isPalindrome(x: number): boolean
{
    const str = x.toString().split('').reverse().join('');
    return x.toString() === str;
};


console.log(isPalindrome(121));
