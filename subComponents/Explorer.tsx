import { useState } from "react";
import React from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructureElements/ExplorerStructure";

function Explorer() 
{
	const [structureState, setStructureState] = useState<boolean>(true);
	const [inputServiceState, setInputServiceState] = useState<boolean>(false);
	const [operationType, setOperationType] = useState<string>("");

	return (
		<div className="Explorer">
			<Inputs 
				setStructureState={setStructureState} 
				setCreatorStatus={setInputServiceState}
				setElementType={setOperationType}
			/>

			<ExplorerStructure 
				structureState={structureState}
				setStructureState={setStructureState} 
				inputServiceState={inputServiceState} 
				setInputServiceState={setInputServiceState} 
				operationType={operationType}
			/>
		</div>
	);		
}

export default Explorer;
