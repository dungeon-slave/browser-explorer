import CRoot from './CRoot';
import CDirectory from '../FileSystemElements/CDirectory';

export default class CLocalStorageWorker
{
    public static async saveProject() : Promise<void>
    {
        if (await navigator.storage.persist()) 
        {
            localStorage.setItem('VirtualFS', JSON.stringify(CRoot.root));
        }        
    }

    public static loadProject() : void
    {
        CRoot.root = Object.setPrototypeOf(JSON.parse(localStorage.getItem('VirtualFS') || '{}'), CDirectory.prototype);
    }
}
