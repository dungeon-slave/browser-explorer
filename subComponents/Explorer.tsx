import { useState } from "react";
import ExplorerStructure from "./ExplorerStructure";
import React from "react";
import Inputs from "./Inputs";

function Explorer()
{
    const[renderState, setRenderState] = useState<boolean>(false);//TODO ненужный renderState

    return(
        <div className="Explorer">
            <>
                <Inputs setRenderState={setRenderState}/>
                <ExplorerStructure/>
            </>
        </div>
    );
}

export default Explorer;
