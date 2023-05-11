import React, { Dispatch, SetStateAction, useEffect } from "react";
import Directory from "../../classes/FileSystemElements/Directory";
import { FileSystemElement } from "../../classes/FileSystemElements/FileSystemElement";
import File from "../../classes/FileSystemElements/File";
import VirtualFileSystemInstance from "../../classes/VirtualFilesSystem/VirtualFileSystemInstance";
import DirectoryComponent from "./DirectoryComponent";
import FileComponent from "./FileComponent";

function ExplorerStructure(props : { structureState : boolean, setStructureState : Dispatch<SetStateAction<boolean>> }) 
{
    const draw = (): JSX.Element => 
    {
        if (VirtualFileSystemInstance.root !== undefined)   
        {
            const stack : FileSystemElement[] = [VirtualFileSystemInstance.root];
            const elements : JSX.Element[] = [];
            let   index : number = 0;
    
            do 
            {
                const currentElement = stack.pop();
    
                if (currentElement?.isDirectory) 
                {
                    const dirElement = currentElement as Directory;
                    //const divRef = useRef<HTMLDivElement>(null);
    
                    elements.push(<DirectoryComponent name={dirElement.name} index={index++}/>);
    
                    dirElement.files.forEach((file: File) => {
                        stack.push(file);
                    });
                    dirElement.subDirectories.forEach((directory: Directory) => {
                        stack.push(directory);
                    });
                } 
                else 
                {
                    const fileElement = currentElement as File;
                    //const divRef = useRef<HTMLDivElement>(null);
    
                    elements.push(<FileComponent name={fileElement.name} index={index++}/>);
                }
            } while (stack.length > 0);

            return <div>{elements}</div>;
        }
        else
        {
            return <div>Root is building...</div>;
        }
    };

    useEffect(() => {
        setTimeout(() => 
        {
            props.setStructureState(true);
        }, 100);
    })
    
    return (
        <div className="ExplorerStructure">
            {props.structureState && draw()}
        </div>
    );
}

export default ExplorerStructure;
