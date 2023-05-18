import React, { Dispatch, SetStateAction, DragEvent, useState } from "react";
import "../styles/dropzone.css";
import { RootBuilder } from "../classes/VirtualFilesSystem/RootBuilder";
import LocalStorageWorker from "../classes/VirtualFilesSystem/LocalStorageWorker";

function Inputs(props : { 
                            setStructureState : Dispatch<SetStateAction<boolean>>,
                            setCreatorStatus  : Dispatch<SetStateAction<boolean>>,
                            setElementType    : Dispatch<SetStateAction<string>>
                        })
{
    const inputHandler = async (event : DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();

        const newEntry : FileSystemEntry | null = event.dataTransfer.items[0].webkitGetAsEntry();

        if (newEntry !== null)
        { 
            RootBuilder.entry = newEntry;
            props.setStructureState(false);
        }
    }

    const addElement = (elementType : string) =>
    {
        props.setCreatorStatus(true);
        props.setElementType(elementType);
    }

    return(
        <div>
            <div draggable id="dropzone" onDrop={inputHandler} onDragOver={(event) => { event.preventDefault(); }}>
                <div>Drop Files Here</div>
            </div>

            <button onClick={() => LocalStorageWorker.saveProject()}>Save project</button>
            <button onClick={() => addElement('ADD FILE')}>Add file</button>
            <button onClick={() => addElement('ADD DIRECTORY')}>Add directory</button>
        </div>
    );
}

export default Inputs;
