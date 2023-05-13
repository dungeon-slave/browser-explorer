import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

function DirectoryComponent(props: { path 			 	: string, 
									 index 			 	: number, 
									 selectState 	 	: boolean, 
									 setSelectState  	: Dispatch<SetStateAction<boolean>>
									})
{
	const divRef = useRef<HTMLDivElement>(null);
	const handledRef = useRef<boolean>(false);
	const showingRef = useRef<boolean>(true);
	const [clickState, setClickState] = useState<boolean>(false);
	
	const color        : string = clickState ? '#efd777' : '#f5f5f5';
	const pathElements : string[] = props.path.split('/');
	const length 	   : number = pathElements.length - 1;

	const handleClick = () =>
	{
		setClickState(true);
		handledRef.current = true;

		props.setSelectState((prevState) => !prevState);
	}

	const setName = () => 
	{
		return setIndent(length) + pathElements[length];
	}

	const setIndent = (count : number) : string =>
	{
		let indent : string = "";

		for (let i = 0; i < count; i++) 
		{
			indent += "- - ";
		}

		return indent;
	}

	useEffect(() =>
	{
		if (!handledRef.current) 
		{
			setClickState(false);	
		}
		handledRef.current = false;
	}, [props.selectState]);
	
	if (showingRef.current) 
	{
		return(
			<div  
				key={props.index} 
				onClick={handleClick} 
				//onFocus={handleClick}
				ref={divRef} 
				tabIndex={props.index}
				style={{ backgroundColor: color }}>
	
				<p>{setName()}</p>
			
			</div>
		);
	}
	else
	{
		return(<div></div>);
	}
}

export default DirectoryComponent;
