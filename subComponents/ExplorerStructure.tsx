import React from "react";
import VirtualFileSystemInstance from "../classes/VirtualFilesSystem/VirtualFileSystemInstance";
import LocalStorageWorker from "../classes/VirtualFilesSystem/LocalStorageWorker";

function ExplorerStructure()
{
    const loader = () => //TODO Костыль
    {
        if (VirtualFileSystemInstance.root.name === "") 
        {
            LocalStorageWorker.loadProject();
        }

        return VirtualFileSystemInstance.root.name;
    }

    return(
        <div className="ExplorerStructure">
            <p>{loader()}</p>
        </div>
    );
}

export default ExplorerStructure;
