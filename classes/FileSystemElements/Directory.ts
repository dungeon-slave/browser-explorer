import  File from "./File";
import  { FileSystemElement }  from "./FileSystemElement";

export default class Directory extends FileSystemElement
{
    private _files: File[];

    public get files(): File[] 
    {
        return this._files;
    }

    public set files(value: File[]) 
    {
        this._files = value;
    }

    private _subDirectories : Directory[];

    public get subDirectories() : Directory[] 
    {
        return this._subDirectories;
    }

    public set subDirectories(value : Directory[]) 
    {
        this._subDirectories = value;
    }

    constructor(name : string, subDirectories : Directory[], files : File[])
    {
        super(name, true);
        this._subDirectories = subDirectories;
        this._files = files;
    }
}
