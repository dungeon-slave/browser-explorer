import { IRootCreator } from "../../interfaces/IRootCreator";
import CDirectory from "../FileSystemElements/CDirectory";
import CFile from "../FileSystemElements/CFile";

export class CLocalRootCreator implements IRootCreator
{
    private _entry : FileSystemEntry;
    private _root : CDirectory;

    public createRoot() : CDirectory 
    {
        this.buildRoot(this._entry, this._root);

        return this._root;
    }

    constructor(entry : FileSystemEntry)
    {
        this._entry = entry;
        this._root = new CDirectory(entry.isDirectory ? entry.name : "Empty root", [], []);
    }

    private buildRoot(currEntry : FileSystemEntry, currRoot: CDirectory) : void
    {
        if (currEntry.isDirectory) 
        {
            const subDir = new CDirectory(currEntry.name, [], []);
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
      
            fileEntry.file((file : File) => {
      
                reader.onload = () => {
                    currRoot.files.push(new CFile(fileEntry.name, reader.result as string));
                };
      
                reader.readAsText(file);
            });
        }
    }
}
