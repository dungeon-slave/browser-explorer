import React, { Dispatch, SetStateAction } from "react";
import { VirtualFileSystemUpdater } from "../../classes/VirtualFilesSystem/VirtualFileSystemUpdater";

function ElementCreator(props : {
									path : string, 
									elementType : string,
									setCreatorState : Dispatch<SetStateAction<boolean>> 
								})
{
	const cancelInputHandler = () =>
	{
		props.setCreatorState(false);
	}

	const okeyInputHandler = () =>
	{
		const name : string = (document.getElementById("ElCreatorInput") as HTMLInputElement).value;

		if (props.elementType === 'file') 
		{
			VirtualFileSystemUpdater.addFile(props.path, name);	
		}
		else
		{
			VirtualFileSystemUpdater.addDirectory(props.path, name);
		}
		props.setCreatorState(false);
	}

	return(
		<div className="Element creator">
			<input type="text" id="ElCreatorInput"></input>
			<button onClick={okeyInputHandler}>Okay</button>
			<button onClick={cancelInputHandler}>Cancel</button>
		</div>
	);
}

export default ElementCreator;
