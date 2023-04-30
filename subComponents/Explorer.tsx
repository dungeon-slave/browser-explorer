import { useState } from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructure";
import React from "react";

function Explorer()
{
    const [files, setTitle] = useState<string[]>();

    return(
        <div className="Explorer">
            <>
                <Inputs setTitle={setTitle}/>
                <ExplorerStructure files={files as string[]}/>
            </>
        </div>
    );
}

export default Explorer;