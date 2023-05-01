import '../styles/Explorer.css';
import * as React from "react";
import { getFilesPathes } from '../scripts/getFilesPathes';
import { Data } from '../scripts/Data';
import { useEffect, useRef } from 'react';

function Inputs(props : {setData : React.Dispatch<React.SetStateAction<Data>>, data : Data}) 
{
  //------------------------------------------------------
    // Используется для прокидывания webkitdirectory в инпут
    // Данный атрибут нужен для возможности загрузки целой папки
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => 
    {
      if (ref.current !== null) { ref.current.setAttribute("webkitdirectory", ""); }
    }, [ref]);
  //------------------------------------------------------

  const inputHandler = () => 
  {
    const pathes = getFilesPathes();

    props.setData(prevState => {
        const data = Object.assign({}, prevState);
        data.pathes = pathes;
        return data;
    });
  }

  return (
    <div className="Inputs">
      <input id="folderInput" type="file" onChange={inputHandler} ref={ref}/>

      <button onClick={() => {}}>Add file</button>
      <button onClick={() => {}}>Add folder</button>
    </div>
  );
}

export default Inputs;
