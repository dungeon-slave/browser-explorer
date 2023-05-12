import  File from "./File";
import  { FileSystemElement }  from "./FileSystemElement";

export default class Directory extends FileSystemElement
{
    private _files: File[];

    public get files(): File[] 
    {
        return this._files;
    }

    public addFile(newFile: File) 
    {
        this._files.push(newFile);
    }

    private _subDirectories : Directory[];

    public get subDirectories() : Directory[] 
    {
        return this._subDirectories;
    }

    public addDirectory(newDirectory : Directory) 
    {
        this._subDirectories.push(newDirectory);
    }

    constructor(name : string, subDirectories : Directory[], files : File[], path : string)
    {
        super(name, true, path);
        this._subDirectories = subDirectories;
        this._files = files;
    }
}
