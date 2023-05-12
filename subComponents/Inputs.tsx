import React, { Dispatch, SetStateAction, DragEvent } from "react";
import "../styles/dropzone.css";
import { RootBuilder } from "../classes/VirtualFilesSystem/RootBuilder";
import LocalStorageWorker from "../classes/VirtualFilesSystem/LocalStorageWorker";

function Inputs(props : { setStructureState : Dispatch<SetStateAction<boolean>> })
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

    return(
        <div>
            <div draggable id="dropzone" onDrop={inputHandler} onDragOver={(event) => { event.preventDefault(); }}>
                <div>Drop Files Here</div>
            </div>

            <button onClick={() => LocalStorageWorker.saveProject()}>Save project</button>
            <button onClick={() => {}}>Add file</button>
            <button onClick={() => {}}>Add folder</button>
        </div>
    );
}

export default Inputs;
