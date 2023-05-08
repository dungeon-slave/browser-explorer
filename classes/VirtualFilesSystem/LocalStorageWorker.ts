import VirtualFileSystemInstance from './VirtualFileSystemInstance';
import Directory from '../FileSystemElements/Directory';

export default class LocalStorageWorker
{
    public static async saveProject() : Promise<void>
    {
        if (await navigator.storage.persist()) 
        {
            localStorage.setItem('VirtualFS', JSON.stringify(VirtualFileSystemInstance.root));
        }        
    }

    public static loadProject() : void
    {
        VirtualFileSystemInstance.root = Object.setPrototypeOf(JSON.parse(localStorage.getItem('VirtualFS') || '{}'), Directory.prototype);
    }
}
