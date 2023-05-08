import React, { Dispatch, SetStateAction, DragEvent } from "react";
import "../styles/dropzone.css";
import { LocalRootCreator } from "../classes/VirtualFilesSystem/LocalRootCreator";
import VirtualFileSystemInstance from "../classes/VirtualFilesSystem/VirtualFileSystemInstance";
import LocalStorageWorker from "../classes/VirtualFilesSystem/LocalStorageWorker";

function Inputs(props : { setRenderState : Dispatch<SetStateAction<boolean>> })
{
    const inputHandler = (event : DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();

        const item : FileSystemEntry | null = event.dataTransfer.items[0].webkitGetAsEntry();

        if (item) 
        { 
            let rootCreator : LocalRootCreator = new LocalRootCreator(item);
            VirtualFileSystemInstance.root = rootCreator.createRoot();
            props.setRenderState((prevState) => !prevState); 
        }
    }

    return(
        <div>
            <div draggable id="dropzone" onDrop={inputHandler} onDragOver={(event) => { event.preventDefault(); }}>
                <div>Drop Files Here</div>
            </div>

            <button onClick={() => LocalStorageWorker.saveProject()}>Save project</button>
            <button onClick={() => {props.setRenderState((prevState) => !prevState)}}>Add file</button>
            <button onClick={() => {}}>Add folder</button>
        </div>
    );
}

export default Inputs;
