import React, { Dispatch, SetStateAction, DragEvent } from "react";
import "../styles/dropzone.css";
import { CLocalRootCreator } from "../classes/VirtualFilesSystem/CLocalRootCreator";

function Inputs(props : { setRenderState : Dispatch<SetStateAction<boolean>> })
{
    const inputHandler = (event : DragEvent<HTMLDivElement>) => 
    {
        event.preventDefault();

        const item : FileSystemEntry | null = event.dataTransfer.items[0].webkitGetAsEntry();

        if (item) 
        { 
            let rootCreator : CLocalRootCreator = new CLocalRootCreator(item);
            console.log(rootCreator.createRoot());
            props.setRenderState((prevState) => !prevState); 
        }
    }

    return(
        <div>
            <div draggable id="dropzone" onDrop={inputHandler} onDragOver={(event) => { event.preventDefault(); }}>
                <div>Drop Files Here</div>
            </div>

            <button onClick={() => {}}>Add file</button>
            <button onClick={() => {}}>Add folder</button>
        </div>
    );
}

export default Inputs;
