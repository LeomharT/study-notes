function maxEnvelopes(envelopes: number[][]): number
{
    let russianDolls: any[] = [];

    envelopes.sort((a: number[], b: number[]) =>
    {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });

    let index = envelopes.length - 1;

    while (index >= 0)
    {
        let outer: number[] = envelopes[index];
        const evs: number[][] = [];
        for (let i = index; i >= 0; i--)
        {
            if (outer[0] > envelopes[i][0] && outer[1] > envelopes[i][1])
            {
                evs.push(outer);
                outer = envelopes[i];
            }
        }
        evs.push(outer);
        index--;
        if (!russianDolls.length)
        {
            russianDolls.push(evs);
        }
        if (russianDolls.length && russianDolls[0].length < evs.length)
        {
            russianDolls[0] = evs;
        }
    }
    console.log(envelopes);
    console.log(russianDolls);

    return russianDolls[0].length ?? 1;
};




console.log(maxEnvelopes(
    [[46, 89], [50, 53], [52, 68], [72, 45], [77, 81]]
));
