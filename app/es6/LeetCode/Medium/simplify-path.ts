function simplifyPath(path: string): string
{
    path = path.replace(/(\/)\1+/g, "$1");;
    if (path.endsWith('/'))
    {
        path = path.slice(0, path.length - 1);
    }

    const pathArr = path.split("/");

    const splicePath = (pathArr: string[]): string[] =>
    {
        return (
            pathArr.reduce((prve: string[], curr, index) =>
            {
                prve = pathArr;
                if (curr === '..')
                {
                    prve.splice(index, 1);
                    if (prve[index - 1])
                    {
                        prve.splice(index - 1, 1);
                    }
                    return splicePath(prve);
                } else if (curr === '.')
                {
                    prve.splice(index, 1);
                    return splicePath(prve);
                } else
                {
                    return prve;
                }
            }, [])
        );
    };

    const target = splicePath(pathArr);
    let str = target.join('/');
    if (str === '')
    {
        return "/";
    }
    if (!str.startsWith('/')) str = `/${str}`;
    return str;
};



console.log(simplifyPath("/.././em/jl///../.././../E/"));
