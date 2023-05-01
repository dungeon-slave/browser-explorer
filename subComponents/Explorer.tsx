import { useState } from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructure";
import React from "react";
import { Data } from "../scripts/Data";

function Explorer()
{
    const [data, setData] = useState<Data>(new Data());

    return(
        <div className="Explorer">
            <>
                <Inputs setData={setData} data={data}/>
                <ExplorerStructure data={data}/>
            </>
        </div>
    );
}

export default Explorer;
