import CDirectory from "../FileSystemElements/CDirectory";

export default class CRoot
{
    private static _root: CDirectory = new CDirectory("", [], []);
    
    public static get root() : CDirectory 
    {
        return CRoot._root;
    }
    public static set root(newRoot : CDirectory) 
    {
        CRoot._root = newRoot;
    }
}
