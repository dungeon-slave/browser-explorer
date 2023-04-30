import React from "react";
import { DrawStructure } from "../scripts/DrawStructure";

function ExplorerStructure(props : {files: string[]})
{
    return(
        <div className="ExplorerStructure">
            <>
                {DrawStructure(props.files)}
            </>
        </div>
    );
}

export default ExplorerStructure;