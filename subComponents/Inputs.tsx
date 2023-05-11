import React, { Dispatch, SetStateAction, DragEvent } from "react";
import "../styles/dropzone.css";
import { RootBuilder } from "../classes/VirtualFilesSystem/RootBuilder";
import LocalStorageWorker from "../classes/VirtualFilesSystem/LocalStorageWorker";

function Inputs(props : { setStructureState : Dispatch<SetStateAction<boolean>> })
{
    async function updateRoot() 
	{
        await RootBuilder.updateRoot();
	}

    const inputHandler = async (event : DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();

        const newEntry : FileSystemEntry | null = event.dataTransfer.items[0].webkitGetAsEntry();

        if (newEntry)
        { 
            //props.setStructureState(false);
            RootBuilder.entry = newEntry;
            //RootBuilder.updateRoot();
            await updateRoot()
            props.setStructureState(false)
        }
    }

    return(
        <div>
            <div draggable id="dropzone" onDrop={inputHandler} onDragOver={(event) => { event.preventDefault(); }}>
                <div>Drop Files Here</div>
            </div>

            <button onClick={() => LocalStorageWorker.saveProject()}>Save project</button>
            <button onClick={() => {}}>Update state</button>
            <button onClick={() => {}}>Add folder</button>
        </div>
    );
}

export default Inputs;
