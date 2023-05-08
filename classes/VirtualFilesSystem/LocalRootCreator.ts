import { IRootCreator } from "../../interfaces/IRootCreator";
import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";

export class LocalRootCreator implements IRootCreator
{
    private _entry : FileSystemEntry;
    private _root  : Directory;

    public createRoot() : Directory 
    {
        this.buildRoot(this._entry, this._root);

        return this._root;
    }

    constructor(entry : FileSystemEntry)
    {
        this._entry = entry;
        this._root = new Directory(entry.isDirectory ? entry.name : "Empty root", [], []);
    }

    private buildRoot(currEntry : FileSystemEntry, currRoot: Directory) : void
    {
        if (currEntry.isDirectory) 
        {
            const subDir = new Directory(currEntry.name, [], []);
            const dirReader = (currEntry as FileSystemDirectoryEntry).createReader();

            currRoot.subDirectories.push(subDir);
      
            dirReader.readEntries((entries) => {
                if (entries.length !== 0) 
                { 
                    entries.forEach((entry) => { this.buildRoot(entry, subDir); });
                }
            });
        }
        else
        {
            const fileEntry = (currEntry as FileSystemFileEntry);
            const reader = new FileReader();
      
            fileEntry.file((file : globalThis.File) => {
      
                reader.onload = () => {
                    currRoot.files.push(new File(fileEntry.name, reader.result as string));
                };
      
                reader.readAsText(file);
            });
        }
    }
}
