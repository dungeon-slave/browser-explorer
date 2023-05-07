import  CFile from "./CFile";
import  { CFileSystemElement }  from "./CFileSystemElement";

export default class CDirectory extends CFileSystemElement
{
    private _files: CFile[];

    public get files(): CFile[] 
    {
        return this._files;
    }

    public set files(value: CFile[]) 
    {
        this._files = value;
    }

    private _subDirectories : CDirectory[];

    public get subDirectories() : CDirectory[] 
    {
        return this._subDirectories;
    }

    public set subDirectories(value : CDirectory[]) 
    {
        this._subDirectories = value;
    }

    constructor(name : string, subDirectories : CDirectory[], files : CFile[])
    {
        super(name, true);
        this._subDirectories = subDirectories;
        this._files = files;
    }
}
