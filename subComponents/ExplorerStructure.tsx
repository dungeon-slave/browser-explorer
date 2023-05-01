import React from "react";
import { Data } from "../scripts/Data";

function ExplorerStructure(props : {data: Data})
{
    return(
        <div className="ExplorerStructure">
            <>
                <ul>
                    {props.data.pathes.map(path =>
                        <li key={path}>
                            ${path}
                        </li>)}
                </ul>
            </>
        </div>
    );
}

export default ExplorerStructure;
