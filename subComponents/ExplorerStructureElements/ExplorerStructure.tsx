import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Directory from "../../classes/FileSystemElements/Directory";
import { FileSystemElement } from "../../classes/FileSystemElements/FileSystemElement";
import File from "../../classes/FileSystemElements/File";
import VirtualFileSystemInstance from "../../classes/VirtualFilesSystem/VirtualFileSystemInstance";
import DirectoryComponent from "./DirectoryComponent";
import FileComponent from "./FileComponent";
import { RootBuilder } from "../../classes/VirtualFilesSystem/RootBuilder";

function ExplorerStructure(props : { structureState : boolean, setStructureState : Dispatch<SetStateAction<boolean>> }) 
{
    const [selectState, setSelectState] = useState<boolean>(true);

    const draw = () : JSX.Element => 
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
    
                    elements.push(<DirectoryComponent 
                                        path={dirElement.path} 
                                        index={index++} 
                                        selectState={selectState} 
                                        setSelectState={setSelectState}
                                />);
    
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
    
                    elements.push(<FileComponent path={fileElement.path} index={index++} selectState={selectState} setSelectState={setSelectState} text={fileElement.text}/>);
                }
            } while (stack.length > 0);


            return <div>{elements}</div>;
        }
        else
        {
            return <div>Root is building...</div>;
        }
    };

	useEffect(() => 
	{
		const asyncStateUpdate = async () =>
		{
			const isUpdated : boolean = await RootBuilder.updateRoot();
			props.setStructureState(isUpdated);
		}

		asyncStateUpdate();
	}, [props.structureState]);
    
    return (
        <div className="ExplorerStructure">
            {draw()}
        </div>
    );
}

export default ExplorerStructure;
