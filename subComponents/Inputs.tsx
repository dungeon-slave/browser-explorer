import '../styles/Explorer.css';
import * as React from "react";
import { getDir } from '../scripts/FgetDirName';

function Inputs(props : {setTitle : any}) 
{
  //------------------------------------------------------
    // Используется для прокидывания атрибутов в инпут
    // Данные атрибуты нужны для возможности загрузки целой папки
    const ref = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => 
    {
      if (ref.current !== null) {
        ref.current.setAttribute("webkitdirectory", "");
      }
    }, [ref]);
  //------------------------------------------------------

  return (
    <div className="Inputs">
      <input id="folderInput" type="file" onChange={() => props.setTitle(getDir)} ref={ref}/>

      {/*<button onClick={() => props.setTitle(getDir)}>Open file/folder</button>*/}
      <button /*onClick={}*/>Add file</button>
      <button /*onClick={}*/>Add folder</button>
    </div>
  );
}

export default Inputs;
