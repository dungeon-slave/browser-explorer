import VirtualFileSystemInstance from './VirtualFileSystemInstance';
import Directory from '../FileSystemElements/Directory';
import File from '../FileSystemElements/File';

export default class LocalStorageWorker
{
    public static async saveProject() : Promise<void>
    {
        try 
        {
            if (await navigator.storage.persist()) 
            {
                localStorage.setItem('VirtualFS', JSON.stringify(VirtualFileSystemInstance.root));
            }   
        } 
        catch (error) 
        {
            alert("You have exceeded the maximum size available in localstorage, try to save something smaller.");
        }
    }

    public static async loadProject() : Promise<Directory>
    {
        try 
        {
            const serializedObject = localStorage.getItem('VirtualFS');
            const deserializedObject = JSON.parse(serializedObject!);
            const newRoot : Directory = new Directory(deserializedObject._name, [], [], deserializedObject._path);

            const addSubDirectories = (parentDirectory: Directory, subDirectories: any[]) => {
                for (const subDirectory of subDirectories) 
                {
                    const newSubDirectory = new Directory(subDirectory._name, [], [], subDirectory._path);

                    parentDirectory.addDirectory(newSubDirectory);
                    addSubDirectories(newSubDirectory, subDirectory._subDirectories);
                    for (const file of subDirectory._files) 
                    {
                        newSubDirectory.addFile(new File(file._name, file._text, file._path));
                    }
                }
            };

            addSubDirectories(newRoot, deserializedObject._subDirectories);

            for (const file of deserializedObject._files) 
            {
                newRoot.addFile(new File(file._name, file._text, file._path));
            }

            return newRoot;
        } 
        catch (error) 
        {
            throw new Error("Empty local storage");
        }
    }

}
