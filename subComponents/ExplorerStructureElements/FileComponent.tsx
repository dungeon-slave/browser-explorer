import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { VirtualFileSystemUpdater } from "../../classes/VirtualFilesSystem/VirtualFileSystemUpdater";
import InputService from "./InputService";
// import { fileInstance } from "../../../editor/App";

function FileComponent(props: { 
								path 		    : string, 
								text 		    : string, 
								index 		    : number, 
								selectState     : String, 
								creatorState    : boolean,
								setSelectState  : Dispatch<SetStateAction<String>>,
								setCreatorState	: Dispatch<SetStateAction<boolean>>
							  })
{
	const divRef = useRef<HTMLDivElement>(null);
	
	const isSelected   : boolean = props.path === props.selectState.valueOf();
	const color        : string = isSelected ? '#efd777' : '#f5f5f5';
	const pathElements : string[] = props.path.split('/');
	const length 	   : number = pathElements.length - 1;

	const handleClick = () =>
	{
		props.setSelectState(new String(props.path));
	}

	const handleKeyDown = (event : React.KeyboardEvent<HTMLDivElement>) =>
	{
		if (event.key === "Delete" && isSelected) 
		{
			VirtualFileSystemUpdater.removeFile(props.path);
			props.setSelectState(new String(""));
		}
		if (event.code === 'F2' && isSelected) 
		{
			props.setCreatorState(true);
		}
	}

	const setName = () => 
	{
		return pathElements[length];
	}
	
	if (props.creatorState && isSelected) 
	{
		return(
			<InputService 
				setServiceState={props.setCreatorState} 
				path={props.path} 
				operationType={"RENAME FILE"}
				prevName={pathElements[length]}
			/>
		);
	}
	return(
		<div  
			key={props.index} 
			onClick={handleClick} 
			onKeyDown={handleKeyDown}
			ref={divRef} 
			tabIndex={props.index}
			style={{ backgroundColor: color, paddingLeft: 10 * length }}>

			<p>{setName()}</p>
		
		</div>
	);
}

export default FileComponent;
