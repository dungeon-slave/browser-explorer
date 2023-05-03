export class FileSystemElement
{
    constructor(path : string, isDirectory : boolean)
    {
        this._path = path;
        this._isDirectory = isDirectory;
        this._name = path; //not finished yet
    }

    private _name : string;

    public get elementName() : string 
    {
        return this._name;
    }

    public set elementName(value : string) 
    {
        this._name = value;
    }


    private _path : string;

    public get path() : string 
    {
        return this._path;
    }

    public set path(value : string) 
    {
        this._path = value;
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
