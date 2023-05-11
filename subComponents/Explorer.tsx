import { useEffect, useState } from "react";
import React from "react";
import Inputs from "./Inputs";
import { RootBuilder } from "../classes/VirtualFilesSystem/RootBuilder";
import ExplorerStructure from "./ExplorerStructureElements/ExplorerStructure";

function Explorer() 
{
	const [structureState, setStructureState] = useState<boolean>(false);

	async function updateRoot() 
	{
		await RootBuilder.updateRoot();
	}

	useEffect(() => 
	{
		updateRoot().then(() => setStructureState(true));
	}, []);


	return (
		<div className="Explorer">
			<Inputs setStructureState={setStructureState}/>
			<ExplorerStructure structureState={structureState} setStructureState={setStructureState}/>
		</div>
	);		
}

export default Explorer;
