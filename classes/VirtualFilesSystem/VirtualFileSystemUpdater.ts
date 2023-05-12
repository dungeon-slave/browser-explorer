import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";
import VirtualFileSystemInstance from "./VirtualFileSystemInstance";

export class VirtualFileSystemUpdater extends VirtualFileSystemInstance
{
    public renameDirectory()
    {

    }

    public renameFile()
    {

    }

    public addDirectory()
    {

    }

    public removeDirectory()
    {

    }

    public static addFile(parentFolderPath : string, fileName : string)
    {
        let foldersWay : string[] = parentFolderPath.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        let currDirectory : Directory = VirtualFileSystemInstance.root;

        while (foldersWay.length > 0) 
        {
            const nextDirectory = currDirectory.subDirectories.find((element) => 
            {
                if (element !== undefined) 
                {
                    return element.name === foldersWay[0];
                }
            });
            if (nextDirectory !== undefined) 
            {
                currDirectory = nextDirectory; 
            }
            foldersWay.shift();
        }

        currDirectory.addFile(new File(fileName, "", parentFolderPath + '/' + fileName));
    }

    public removeFile()
    {

    }

    public changeFileText()
    {

    }
}
