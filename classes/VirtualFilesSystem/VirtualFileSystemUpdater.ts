import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";
import VirtualFileSystemInstance from "./VirtualFileSystemInstance";

export class VirtualFileSystemUpdater extends VirtualFileSystemInstance
{
    public static renameDirectory()
    {

    }

    public renameFile()
    {

    }

    public static addDirectory(parentFolderPath : string, dirName : string)
    {
        const pathParts = parentFolderPath.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const parentDirectory = this.getParentDirectory(pathParts);

        if (this.checkUniqueness(parentDirectory, dirName)) 
        {
            parentDirectory.addDirectory(new Directory(dirName, [], [], parentFolderPath + '/' + dirName));
        }
    }

    public static addFile(parentFolderPath : string, fileName : string)
    {
        const pathParts = parentFolderPath.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const parentDirectory = this.getParentDirectory(pathParts);

        if (this.checkUniqueness(parentDirectory, fileName)) 
        {
            parentDirectory.addFile(new File(fileName, "", parentFolderPath + '/' + fileName));
        }
    }

    public static removeFile(path : string) : void
    {
        const pathParts = path.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const removableElement = pathParts[pathParts.length - 1];
        pathParts.pop();
        const parentDirectory = this.getParentDirectory(pathParts);
        const newFiles : File[] = parentDirectory.files.filter((item) => { return item.name !== removableElement});

        if (newFiles.length < parentDirectory.files.length) 
        {
            parentDirectory.files = newFiles;    
        }
    }

    public static removeDirectory(path : string) : void
    {
        const pathParts = path.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const removableElement = pathParts[pathParts.length - 1];
        pathParts.pop();
        const parentDirectory = this.getParentDirectory(pathParts);
        const newSubDirectories : Directory[] = parentDirectory.subDirectories.filter((item) => { return item.name !== removableElement});

        if (newSubDirectories.length < parentDirectory.subDirectories.length) 
        {
            parentDirectory.subDirectories = newSubDirectories;    
        }
    }

    private static getParentDirectory(pathParts : string[]) : Directory
    {
        let parentDirectory : Directory = VirtualFileSystemInstance.root;

        while (pathParts.length > 0) 
        {
            const nextDirectory = parentDirectory.subDirectories.find((element) => 
            {
                if (element !== undefined) 
                {
                    return element.name === pathParts[0];
                }
            });
            if (nextDirectory !== undefined) 
            {
                parentDirectory = nextDirectory; 
            }
            pathParts.shift();
        }

        return parentDirectory;
    }

    private static checkUniqueness(parentDirectory : Directory, elementName : string) : boolean
    {
        return (parentDirectory.files.filter((item) => {return item.name !== elementName}).length === parentDirectory.files.length)
            && (parentDirectory.subDirectories.filter((item) => {return item.name !== elementName}).length === parentDirectory.subDirectories.length);
    }

    public changeFileText()
    {

    }
}
