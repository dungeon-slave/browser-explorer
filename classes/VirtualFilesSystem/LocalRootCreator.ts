import { IRootCreator } from "../../interfaces/IRootCreator";
import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";

export class LocalRootCreator implements IRootCreator
{
    private _entry : FileSystemEntry;
    private _root  : Directory | null = null;

    public async newRoot() : Promise<Directory>
    {
        if (!this._root) 
        {
            this._root = await this.buildRoot(this._entry);
        }
        return this._root;
    }

    constructor(entry : FileSystemEntry)
    {
        this._entry = entry;
    }

    private async buildRoot(currEntry: FileSystemEntry): Promise<Directory> 
    {
        const currRoot = new Directory(currEntry.name, [], []);
      
        if (currEntry.isDirectory) 
        {
            const dirReader = (currEntry as FileSystemDirectoryEntry).createReader();
        
            dirReader.readEntries(async (entries) => {
                for (const entry of entries) 
                {
                    if (entry.isDirectory) 
                    {
                        currRoot.subDirectories.push(await this.buildRoot(entry));
                    } 
                    else 
                    {
                        currRoot.files.push(await this.readFile(entry as FileSystemFileEntry));
                    }
                }
            });
        } 
        else 
        {
            currRoot.files.push(await this.readFile(currEntry as FileSystemFileEntry));
        }
      
        return currRoot;
    }

    private async readFile(entry: FileSystemFileEntry): Promise<File> 
    {
        const reader = new FileReader();
        
        entry.file((file) => { reader.readAsText(file); });

        return await new Promise((resolve) => { reader.onload = () => { resolve(new File(entry.name, reader.result as string)); }; });
    }
}
