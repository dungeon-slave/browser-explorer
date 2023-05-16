import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import InputService from "./InputService";
import { VirtualFileSystemUpdater } from "../../classes/VirtualFilesSystem/VirtualFileSystemUpdater";

function DirectoryComponent(props: { 
										path 			 	 : string, 
										index 			 	 : number, 
										selectState 	 	 : String, 
										inputServiceState	 : boolean,
										operationType	     : string,
										setSelectState  	 : Dispatch<SetStateAction<String>>,
										setHidedDirectories  : Dispatch<SetStateAction<string[]>>,
										setInputServiceState : Dispatch<SetStateAction<boolean>>
									})
{
	const divRef = useRef<HTMLDivElement>(null);
	const [renameTry, setRenameTry] = useState<boolean>(false);
	
	const isSelected   : boolean = props.path === props.selectState.valueOf();
	const color        : string = isSelected ? '#efd777' : '#f5f5f5';
	const pathElements : string[] = props.path.split('/');
	const length 	   : number = pathElements.length - 1;

	const changeHiding = () =>
	{
		props.setHidedDirectories((prevState) => 
		{
			const newState = prevState.filter(item => item !== props.path);

			if (newState.length < prevState.length) 
			{
				return newState;	
			}
			else
			{
				newState.push(props.path);
				return newState;
			}
		});
	}

	const handleClick = () =>
	{
		props.setSelectState(new String(props.path));
		if (props.inputServiceState) 
		{
			props.setInputServiceState(false);
		}
		changeHiding();
	}

	const handleKeyDown = (event : React.KeyboardEvent<HTMLDivElement>) =>
	{
		if (event.key === "Delete" && isSelected) 
		{
			VirtualFileSystemUpdater.removeDirectory(props.path);
			props.setSelectState(new String(""));
		}
		if (event.code === 'F2' && isSelected) 
		{
			setRenameTry(true);
			props.setInputServiceState(true);
		}
	}

	useEffect(() =>
	{
		if (renameTry && !props.inputServiceState) 
		{
			setRenameTry(false);	
		}
	}, [props.inputServiceState]);

	const setName = () => 
	{
		return " - " + pathElements[length];
	}
	
	if (props.inputServiceState && isSelected && renameTry) 
	{
		return(
			<InputService 
				setServiceState={props.setInputServiceState} 
				path={props.path} 
				operationType={"RENAME DIRECTORY"}
				prevName={pathElements[length]}
			/>
		);
	}
	return(
			<div>
				<div
					key={props.index} 
					onClick={handleClick} 
					onKeyDown={handleKeyDown}
					ref={divRef} 
					tabIndex={props.index}
					style={{ backgroundColor: color, paddingLeft: 10 * length }}>

					<p>{setName()}</p>

				</div>
				
				{isSelected && props.inputServiceState && 
				
				<InputService 
					path={props.path} 
					operationType={props.operationType} 
					setServiceState={props.setInputServiceState}
					prevName={""}
				/>}
			</div>
	);
}

export default DirectoryComponent;
