function maxEnvelopes(envelopes: number[][]): number
{
    let russianDolls: any[] = [];

    envelopes.sort((a: number[], b: number[]) =>
    {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });

    let index = 0;

    while (index < envelopes.length)
    {
        let outer: number[] = envelopes[index];
        const evs: number[][] = [];
        for (let i = index + 1; i < envelopes.length; i++)
        {
            if (outer[0] < envelopes[i][0] && outer[1] < envelopes[i][1])
            {
                evs.push(outer);
                outer = envelopes[i];
            }
        }
        evs.push(outer);
        index++;

        russianDolls.push(evs);


    }
    console.log(envelopes);
    console.log(russianDolls);

    return russianDolls[0].length ?? 1;
};




console.log(maxEnvelopes(
    [[2, 100], [3, 200], [4, 300], [5, 500], [5, 400], [5, 250], [6, 370], [6, 360], [7, 380]]
));
