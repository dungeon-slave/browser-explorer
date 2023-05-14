import { useState } from "react";
import React from "react";
import Inputs from "./Inputs";
import ExplorerStructure from "./ExplorerStructureElements/ExplorerStructure";

function Explorer() 
{
	const [structureState, setStructureState] = useState<boolean>(true);
	const [creatorState, setCreatorState] = useState<boolean>(false);
	const [elementType, setElementType] = useState<string>("");

	return (
		<div className="Explorer">
			<Inputs 
				setStructureState={setStructureState} 
				setCreatorStatus={setCreatorState}
				setElementType={setElementType}/>

			<ExplorerStructure 
				structureState={structureState}
				setStructureState={setStructureState} 
				creatorState={creatorState} 
				setCreatorState={setCreatorState} 
				elementType={elementType}/>
		</div>
	);		
}

export default Explorer;
