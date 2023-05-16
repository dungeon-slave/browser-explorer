import React, { Dispatch, SetStateAction, useState } from "react";
import { VirtualFileSystemUpdater } from "../../classes/VirtualFilesSystem/VirtualFileSystemUpdater";

function InputService(props : {
									path : string, 
									operationType : string,
									setServiceState : Dispatch<SetStateAction<boolean>>,
									prevName : string
							  })
{
	const [name, setName] = useState(props.prevName);

	const cancelInputHandler = () =>
	{
		props.setServiceState(false);
	}

	const okeyInputHandler = () =>
	{
		const name : string = (document.getElementById("IS_Input") as HTMLInputElement).value;

		switch (props.operationType) 
		{
			case "ADD FILE":
			{
				VirtualFileSystemUpdater.addFile(props.path, name);	
				break;
			}
			case "ADD DIRECTORY":
			{
				VirtualFileSystemUpdater.addDirectory(props.path, name);
				break;
			}
			case "RENAME FILE":
			{
				VirtualFileSystemUpdater.renameFile(props.path, name);
				break;
			}
			case "RENAME DIRECTORY":
			{
				VirtualFileSystemUpdater.renameDirectory(props.path, name);
				break;
			}
			default:
			{
				break;
			}
		}
		props.setServiceState(false);
	}

	return(
		<div className="Element creator">
			<input 
				type="text" 
				id="IS_Input" 
				value={name}
				onChange={(event) => setName(event.target.value)}
			/>
					
			<button onClick={okeyInputHandler}>Okay</button>
			<button onClick={cancelInputHandler}>Cancel</button>
		</div>
	);
}

export default InputService;
