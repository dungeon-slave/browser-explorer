export class FileSystemElement
{
    constructor(name : string, isDirectory : boolean)
    {
        this._isDirectory = isDirectory;
        this._name = name;
    }

    private _name : string;

    public get name() : string 
    {
        return this._name;
    }

    public set name(value : string) 
    {
        this._name = value;
    }

    private _isDirectory : boolean;

    public get isDirectory() : boolean 
    {
        return this._isDirectory;
    }

    public set isDirectory(value : boolean)
    {
        this._isDirectory = value;
    }
}
