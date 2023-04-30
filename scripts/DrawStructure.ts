//Временная заглушка
export function DrawStructure(filesPathes : string[]) : string
{
    let files : string ="";
    if (filesPathes != null) 
    {
        for (let i = 0; i < filesPathes.length; i++) 
        {
            files += filesPathes[i] + " ";
        }
    }
    
    return files;
}

class FileSystemStructure
{
    public name : string;
    public childrens : FileSystemStructure[] | null;

    constructor(name : string, childrens : FileSystemStructure[] | null)
    {
        this.name = name;
        this.childrens = childrens;
    }
}

function AddToStructure(subStructure : FileSystemStructure | null, filePath : string) : void
{
    let pathParts : string[] = filePath.split('/');

    if (subStructure == null) 
    {
        subStructure = new FileSystemStructure(pathParts[0], null);
    }
    else
    {
        
    }
    if (subStructure.childrens == null) {
        AddToStructure(subStructure.childrens, pathParts[1]);
    }
    else
    {
        
    }

    return;
}
