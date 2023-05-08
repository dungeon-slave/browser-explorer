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

    constructor(name : string, text : string)
    {
        super(name, false);
        this._text = text;
    }
}
