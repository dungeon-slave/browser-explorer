import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function FileComponent(props: { 
								path 		    : string, 
								text 		    : string, 
								index 		    : number, 
								selectState     : String, 
								setSelectState  : Dispatch<SetStateAction<String>>
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

	const setName = () => 
	{
		return pathElements[length];
	}
	
	return(
		<div  
			key={props.index} 
			onClick={handleClick} 
			//onFocus={handleClick}
			ref={divRef} 
			tabIndex={props.index}
			style={{ backgroundColor: color, paddingLeft: 10 * length }}>

			<p>{setName()}</p>
		
		</div>
	);
}

export default FileComponent;
