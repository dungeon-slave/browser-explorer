export class FileSystemElement
{
    constructor(name : string, isDirectory : boolean, path : string)
    {
        this._name = name;
        this._isDirectory = isDirectory;
        this._path = path;
    }

    private _name : string;

    public get name() : string 
    {
        return this._name;
    }

    public set name(newName : string) 
    {
        this._name = newName;
    }

    private _isDirectory : boolean;

    public get isDirectory() : boolean 
    {
        return this._isDirectory;
    }

    private _path : string;

    public get path() : string
    {
        return this._path;
    }
    
    public set path(newPath: string)
    {
        this._path = newPath;
    }
}
