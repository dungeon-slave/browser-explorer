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

    public static async updateRoot() : Promise<boolean>
    {
        try 
        {
            let newRoot : Directory;

            if (RootBuilder._entry === undefined && VirtualFileSystemInstance.root === undefined) 
            {
                try 
                {
                    newRoot = await LocalStorageWorker.loadProject();
                } 
                catch (error) 
                {
                    if ((error as Error).message === "Empty local storage") 
                    {
                        newRoot = await RootBuilder.buildEmptyRoot(); 
                    }
                }
            }
            else
            {
                newRoot = await RootBuilder.buildRootFromEntry(RootBuilder._entry!);
            }
    
            VirtualFileSystemInstance.root = newRoot!;
            return true; 
        } 
        catch (error) 
        {
            return false;
        }
    }

    private static async buildEmptyRoot() : Promise<Directory>
    {
        return new Directory("empty root", [], [], "/empty_root");
    }

    private static async buildRootFromEntry(currEntry: FileSystemEntry): Promise<Directory> 
    {
        const currRoot = new Directory(currEntry.name, [], [], currEntry.fullPath);
      
        if (currEntry.isDirectory) 
        {
            const dirReader = (currEntry as FileSystemDirectoryEntry).createReader();
        
            await new Promise<void>(resolve => {
                dirReader.readEntries(async (entries) => {
                    for (const entry of entries) 
                    {
                        if (entry.isDirectory) 
                        {
                            currRoot.addDirectory(await RootBuilder.buildRootFromEntry(entry));
                        } 
                        else 
                        {
                            currRoot.addFile(await RootBuilder.readFile(entry as FileSystemFileEntry));
                        }
                    }
                    resolve();
                });
            })
        } 
        else 
        {
            currRoot.addFile(await RootBuilder.readFile(currEntry as FileSystemFileEntry));
        }
      
        return currRoot;
    }

    private static async readFile(entry: FileSystemFileEntry): Promise<File> 
    {
        const reader = new FileReader();
        
        entry.file((file) => { reader.readAsText(file); });

        return await new Promise((resolve) => { reader.onload = () => { resolve(new File(entry.name, reader.result as string, entry.fullPath)); }; });
    }
}
