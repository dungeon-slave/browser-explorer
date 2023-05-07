import React from "react";
import CRoot from "../classes/VirtualFilesSystem/CRoot";
import CLocalStorageWorker from "../classes/VirtualFilesSystem/CLocalStorageWorker";

function ExplorerStructure()
{
    const loader = () => //TODO Костыль
    {
        if (CRoot.root.name === "") 
        {
            CLocalStorageWorker.loadProject();
        }

        return CRoot.root.name;
    }

    return(
        <div className="ExplorerStructure">
            <p>{loader()}</p>
        </div>
    );
}

export default ExplorerStructure;
