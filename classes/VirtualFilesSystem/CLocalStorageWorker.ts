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
        let newRoot = JSON.parse(localStorage.getItem('VirtualFS') || '{}');

        CRoot.root = new CDirectory(newRoot._name, newRoot._subDirectories, newRoot._files);//TODO Костыль
    }
}
