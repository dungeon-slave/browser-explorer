import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";
import LocalStorageWorker from "./LocalStorageWorker";
import VirtualFileSystemInstance from "./VirtualFileSystemInstance";

export class RootBuilder
{
    private static _entry? : FileSystemEntry = undefined;

    public static set entry(entry : FileSystemEntry)
    {
        RootBuilder._entry = entry;
    }

    public static updateRoot() : void
    {
        if (RootBuilder._entry === undefined) 
        {
            if (VirtualFileSystemInstance.root === undefined) 
            {
                try 
                {
                    VirtualFileSystemInstance.root = LocalStorageWorker.loadProject();
                } 
                catch (error) 
                {
                    if ((error as Error).message === "Empty local storage") 
                    {
                        RootBuilder.buildEmptyRoot(); 
                    }
                }
            }
        }
        else
        {
            RootBuilder.buildRootFromEntry(RootBuilder._entry).then((result) => {VirtualFileSystemInstance.root = result});
        }

        return;
    }

    private static buildEmptyRoot()
    {
        VirtualFileSystemInstance.root = new Directory("empty root", [], []);
    }

    private static async buildRootFromEntry(currEntry: FileSystemEntry): Promise<Directory> 
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
                        currRoot.subDirectories.push(await RootBuilder.buildRootFromEntry(entry));
                    } 
                    else 
                    {
                        currRoot.files.push(await RootBuilder.readFile(entry as FileSystemFileEntry));
                    }
                }
            });
        } 
        else 
        {
            currRoot.files.push(await RootBuilder.readFile(currEntry as FileSystemFileEntry));
        }
      
        return currRoot;
    }

    private static async readFile(entry: FileSystemFileEntry): Promise<File> 
    {
        const reader = new FileReader();
        
        entry.file((file) => { reader.readAsText(file); });

        return await new Promise((resolve) => { reader.onload = () => { resolve(new File(entry.name, reader.result as string)); }; });
    }
}
