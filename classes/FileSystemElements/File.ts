import { FileSystemElement } from "./FileSystemElement";

export default class File extends FileSystemElement
{
    private _text : string;

    public get text() : string 
    {
        return this._text;
    }
    
    public set text(newText : string) 
    {
        this._text = newText;
    }

    constructor(name : string, text : string, path : string)
    {
        super(name, false, path);
        this._text = text;
    }
}
