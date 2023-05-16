import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";
import VirtualFileSystemInstance from "./VirtualFileSystemInstance";

export class VirtualFileSystemUpdater extends VirtualFileSystemInstance
{     
    public static renameDirectory(path : string, newName : string) 
    {
        const pathParts = path.split('/').filter((item) => {return item !== ""});
        const newPath = VirtualFileSystemUpdater.changePath(pathParts, newName);
        const parentDirectory = VirtualFileSystemUpdater.getParentDirectory(pathParts);

        if (VirtualFileSystemUpdater.checkUniqueness(parentDirectory, newName)) 
        {
            let currDirectory : Directory;

            if (path === VirtualFileSystemInstance.root.path) 
            {
                currDirectory = VirtualFileSystemInstance.root;
            }
            else
            {
                for (let i = 0; i < parentDirectory.subDirectories.length; i++) 
                {
                    currDirectory = parentDirectory.subDirectories[i];
                    if (currDirectory.path === path) 
                    {
                        break;
                    }
                }
            }  

            currDirectory!.path = newPath;
            currDirectory!.name = newName;

            VirtualFileSystemUpdater.updatePaths(currDirectory!, path, newPath);
        } 
    }

    public static renameFile(path : string, newName : string)
    {
        const pathParts = path.split('/');
        const newPath = VirtualFileSystemUpdater.changePath(pathParts, newName);
        pathParts.shift();
        const parentDirectory = VirtualFileSystemUpdater.getParentDirectory(pathParts);

        if (VirtualFileSystemUpdater.checkUniqueness(parentDirectory, newName)) 
        {
            for (let i = 0; i < parentDirectory.files.length; i++) 
            {
                const currFile = parentDirectory.files[i];
                if (currFile.path === path) 
                {
                    currFile.path = newPath;
                    currFile.name = newName;

                    return;
                }                
            }
        }
    }

    public static addDirectory(parentFolderPath : string, dirName : string)
    {
        const pathParts = parentFolderPath.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const parentDirectory = VirtualFileSystemUpdater.getParentDirectory(pathParts);

        if (VirtualFileSystemUpdater.checkUniqueness(parentDirectory, dirName)) 
        {
            parentDirectory.addDirectory(new Directory(dirName, [], [], parentFolderPath + '/' + dirName));
        }
    }

    public static addFile(parentFolderPath : string, fileName : string)
    {
        const pathParts = parentFolderPath.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const parentDirectory = VirtualFileSystemUpdater.getParentDirectory(pathParts);

        if (VirtualFileSystemUpdater.checkUniqueness(parentDirectory, fileName)) 
        {
            parentDirectory.addFile(new File(fileName, "", parentFolderPath + '/' + fileName));
        }
    }

    public static removeFile(path : string) : void
    {
        const pathParts = path.split('/').filter(item => item !== VirtualFileSystemInstance.root.name);
        const removableElement = pathParts[pathParts.length - 1];
        pathParts.pop();
        const parentDirectory = VirtualFileSystemUpdater.getParentDirectory(pathParts);
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

    private static changePath(oldPathParts : string[], newName : string) : string
    {
        let newPath : string = "";

        oldPathParts[oldPathParts.length - 1] = newName;
        for (let i = 0; i < oldPathParts.length; i++) 
        {
            newPath += "/" + oldPathParts[i];
        }

        return newPath;
    }

    private static updatePaths(directory : Directory, oldPath : string, newPath : string) 
    {
        for (let subDirectory of directory.subDirectories) 
        {
            subDirectory.path = subDirectory.path.replace(oldPath, newPath);
            VirtualFileSystemUpdater.updatePaths(subDirectory, oldPath, newPath);
        }

        for (let file of directory.files) 
        {
            file.path = file.path.replace(oldPath, newPath);
        }
    }
}
