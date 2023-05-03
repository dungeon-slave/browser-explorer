import { FileSystemElement } from "./FileSystemElement";

export class File extends FileSystemElement
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

    constructor(path : string, text : string)
    {
        super(path, false);
        this._text = text;
    }
}
