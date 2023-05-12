import { useState } from "react";
import React from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructureElements/ExplorerStructure";

function Explorer() 
{
	const [structureState, setStructureState] = useState<boolean>(false);

	return (
		<div className="Explorer">
			<Inputs setStructureState={setStructureState}/>
			<ExplorerStructure structureState={structureState} setStructureState={setStructureState}/>
		</div>
	);		
}

export default Explorer;
