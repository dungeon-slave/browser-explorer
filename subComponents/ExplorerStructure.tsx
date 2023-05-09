import React, { Dispatch, SetStateAction } from "react";
import VirtualFileSystemInstance from "../classes/VirtualFilesSystem/VirtualFileSystemInstance";
import Directory from "../classes/FileSystemElements/Directory";
import { FileSystemElement } from "../classes/FileSystemElements/FileSystemElement";
import File from "../classes/FileSystemElements/File";

// const loader = () => //TODO Костыль
// {
//     if (VirtualFileSystemInstance.root.name === "") 
//     {
//         LocalStorageWorker.loadProject();
//     }

//     return VirtualFileSystemInstance.root.name;
// }

function ExplorerStructure() 
{
    const drawer = (element: FileSystemElement): JSX.Element => 
    {
        const stack: FileSystemElement[] = [element];
        const elements: JSX.Element[] = [];
    
        do
        {
            const currentElement = stack.pop();
    
            if (currentElement?.isDirectory) 
            {
                let dirElement = currentElement as Directory;
    
                elements.push(
                    <div key={dirElement.name}>
                        <p>{dirElement.name}</p>
                    </div>
                );
    
                dirElement.files.forEach((file: File) => {
                    stack.push(file);
                });
                dirElement.subDirectories.forEach((directory: Directory) => {
                    stack.push(directory);
                });
            }
            else 
            {
                let fileElement = currentElement as File;
    
                elements.push(
                    <div key={fileElement.name}>
                        <p>{fileElement.name}</p>
                    </div>
                );
            }
        } while(stack.length > 0);
    
        return <>{elements}</>;
    }

    return (
        <div className="ExplorerStructure">
            {drawer(VirtualFileSystemInstance.root)}
        </div>
    );
}

export default ExplorerStructure;
