//Временная заглушка
export function DrawStructure(pathes : string[]) : string
{
    let drawPathes : string ="";
    if (pathes != null) 
    {
        for (let i = 0; i < pathes.length; i++) 
        {
            drawPathes += pathes[i] + " ";
        }
    }
    
    return drawPathes;
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
