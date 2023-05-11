import React, { useRef, useState } from "react";

function DirectoryComponent(props: {name : string, index : number})
{
	const divRef = useRef<HTMLDivElement>(null);
	const [clickState, setClickState] = useState<boolean>(false);

	const handleClick = () =>
	{
		setClickState(true);
	}

	const color = clickState ? 'green' : '#f5f5f5'; 
	
	return(
		<div 
			key={props.index} onClick={handleClick} 
			ref={divRef} 
			tabIndex={props.index}
			style={{ backgroundColor: color }}>

			<p>{props.name}</p>
		
		</div>
	);
}

export default DirectoryComponent;
