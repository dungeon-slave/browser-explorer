import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructureElements/ExplorerStructure";
// import { fileInstance } from "../../editor/App";

function Explorer( props: { 
	// setSharedFiles: Dispatch<SetStateAction<fileInstance | undefined>>,
	// sharedFiles: fileInstance | undefined
}) 
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
				// setSharedFiles={props.setSharedFiles}
				// sharedFiles={props.sharedFiles}
			/>
		</div>
	);		
}

export default Explorer;
