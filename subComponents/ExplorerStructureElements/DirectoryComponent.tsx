import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ElementCreator from "./ElementCreator";

function DirectoryComponent(props: { 
										path 			 	: string, 
										index 			 	: number, 
										selectState 	 	: String, 
										setSelectState  	: Dispatch<SetStateAction<String>>,
										setHidedDirectories : Dispatch<SetStateAction<string[]>>,
										creatorState		: boolean,
										setCretorState		: Dispatch<SetStateAction<boolean>>,
										elementType			: string
									})
{
	const divRef = useRef<HTMLDivElement>(null);
	
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
		if (props.creatorState) 
		{
			props.setCretorState(false);
		}
		changeHiding();
	}

	const setName = () => 
	{
		return pathElements[length];
	}
	
	return(
			<div>
				<div
					key={props.index} 
					onClick={handleClick} 
					//onFocus={handleClick}
					ref={divRef} 
					tabIndex={props.index}
					style={{ backgroundColor: color, paddingLeft: 10 * length }}>

					<p>{setName()}</p>

				</div>
				
				{isSelected && props.creatorState && <ElementCreator 
														path={props.path} 
														elementType={props.elementType} 
														setCreatorState={props.setCretorState}/>}
			</div>
	);
}

export default DirectoryComponent;
