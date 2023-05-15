import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructureElements/ExplorerStructure";
//import { fileInstance } from "../../editor/App";

function Explorer( props: { 
//	setSharedFiles: Dispatch<SetStateAction<fileInstance | undefined>>,
//	sharedFiles: fileInstance | undefined
}) 
{
	const [structureState, setStructureState] = useState<boolean>(true);
	const [creatorState, setCreatorState] = useState<boolean>(false);
	const [elementType, setElementType] = useState<string>("");

	return (
		<div className="Explorer">
			<Inputs 
				setStructureState={setStructureState} 
				setCreatorStatus={setCreatorState}
				setElementType={setElementType}
			/>

			<ExplorerStructure 
				structureState={structureState}
				setStructureState={setStructureState} 
				creatorState={creatorState} 
				setCreatorState={setCreatorState} 
				elementType={elementType}
//				setSharedFiles={props.setSharedFiles}
//				sharedFiles={props.sharedFiles}
			/>
		</div>
	);		
}

export default Explorer;
