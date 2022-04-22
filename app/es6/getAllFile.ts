import fs from 'fs';
import path from 'path';




const dirPath = 'L:\\Project Directory\\StudyNode\\AOP';

const GetAllFiles = ({ dirPath, extName }: { dirPath?: string, extName?: string; }): string[] =>
{
    if (!dirPath) dirPath = path.resolve();

    let dirs = fs.readdirSync(dirPath);

    let dirList = dirs.reduce((prve: string[], curr: string) =>
    {
        let absPath = dirPath + path.sep + curr;
        if (fs.statSync(absPath).isDirectory())
        {
            return prve.concat(GetAllFiles({ dirPath: absPath, extName }));
        } else
        {
            if (extName)
            {
                let reg: RegExp = new RegExp(`\\.${extName.replace('.', '')}`, 'g');
                if (reg.test(absPath)) return prve.concat(absPath);
                return prve.concat([]);
            } else
            {
                return prve.concat(absPath);
            }
        }
    }, []);
    return dirList;
};

console.log(GetAllFiles({ extName: "json" }));
