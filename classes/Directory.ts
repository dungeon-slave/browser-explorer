import { FileSystemElement } from "./FileSystemElement";

export class Directory extends FileSystemElement
{
    private _childs: FileSystemElement[];

    public get childs() : FileSystemElement[] 
    {
        return this._childs;
    }

    public set childs(value : FileSystemElement[]) 
    {
        this._childs = value;
    }

    constructor(path : string, childs : FileSystemElement[])
    {
        super(path, true);
        this._childs = childs;
    }
}
