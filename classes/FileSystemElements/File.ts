import { FileSystemElement } from "./FileSystemElement";

export default class File extends FileSystemElement
{
    private _text : string;

    public get text() : string 
    {
        return this._text;
    }
    
    public set text(value : string) 
    {
        this._text = value;
    }

    constructor(name : string, text : string, path : string)
    {
        super(name, false, path);
        this._text = text;
    }
}
