import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DirectoryComponent from "./DirectoryComponent";
import FileComponent from "./FileComponent";
import VirtualFileSystemInstance from "../../classes/VirtualFilesSystem/VirtualFileSystemInstance";
import Directory from "../../classes/FileSystemElements/Directory";
import File from "../../classes/FileSystemElements/File";
import { FileSystemElement } from "../../classes/FileSystemElements/FileSystemElement";
import { RootBuilder } from "../../classes/VirtualFilesSystem/RootBuilder";

function ExplorerStructure(props : { 
                                        structureState       : boolean, 
                                        operationType        : string,
                                        inputServiceState    : boolean,
                                        setStructureState    : Dispatch<SetStateAction<boolean>>,
                                        setInputServiceState : Dispatch<SetStateAction<boolean>>,
                                    }) 
{
    const [selectState, setSelectState] = useState<String>(new String(""));
    const [hidedDirectories, setHidedDirectories] = useState<string[]>([]);
    const [structure, setStructure] = useState<JSX.Element>();

    const draw = () : JSX.Element => 
    {
        if (VirtualFileSystemInstance.root !== undefined)   
        {
            const stack : FileSystemElement[] = [VirtualFileSystemInstance.root];
            const hideElements : FileSystemElement[] = [];
            const elements : JSX.Element[] = [];
            let   index : number = 0;
    
            do 
            {
                const currElement = stack.pop();
                const currHideElement = hideElements.pop();

                if (currHideElement?.path === currElement?.path) 
                {
                    continue;    
                }
    
                if (currElement?.isDirectory) 
                {
                    const dirElement = currElement as Directory;
                    const isHide : boolean = hidedDirectories.find((value) => value === dirElement.path) !== undefined;
    
                    elements.push(<DirectoryComponent 
                                        path={dirElement.path} 
                                        index={index++} 
                                        selectState={selectState} 
                                        setSelectState={setSelectState}
                                        setHidedDirectories={setHidedDirectories}
                                        inputServiceState={props.inputServiceState}
                                        setInputServiceState={props.setInputServiceState}
                                        operationType={props.operationType}
                                />);
    
                    dirElement.files.forEach((file: File) => {
                        if (isHide)
                        {
                            hideElements.push(file);
                        }
                        stack.push(file);
                    });
                    dirElement.subDirectories.forEach((directory: Directory) => {
                        if (isHide)
                        {
                            hideElements.push(directory);
                        }
                        stack.push(directory);
                    });
                } 
                else 
                {
                    const fileElement = currElement as File;
    
                    elements.push(<FileComponent 
                                        path={fileElement.path} 
                                        index={index++} 
                                        selectState={selectState} 
                                        text={fileElement.text}
                                        setSelectState={setSelectState} 
                                        creatorState={props.inputServiceState}
                                        setCreatorState={props.setInputServiceState}
                                />);
                }

            } while (stack.length > 0);

            return <div>{elements}</div>;
        }
        else
        {
            return <div>Root is building...</div>;
        }
    };

    const redraw = async () =>
    {
        const isRedraw = await new Promise<boolean>((resolve) => 
        {
            setStructure(draw());
            resolve(true);
        });

        return isRedraw;
    }

    useEffect(() => 
    {
        const asyncReDraw = async () =>
        {
            await redraw();
        }

        asyncReDraw();
    }, [selectState, props.inputServiceState]);

	useEffect(() => 
	{
		const asyncRootUpdate = async () =>
		{
			const isUpdated : boolean = await RootBuilder.updateRoot() && await redraw();
			props.setStructureState(isUpdated);
		}

		asyncRootUpdate();
	}, [props.structureState]);
    
    return (
        <div className="ExplorerStructure">
            {structure}
        </div>
    );
}

export default ExplorerStructure;
