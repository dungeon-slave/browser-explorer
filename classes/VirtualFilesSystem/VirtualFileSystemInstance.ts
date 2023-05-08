import Directory from "../FileSystemElements/Directory";

export default class VirtualFileSystemInstance
{
    private static _root: Directory = new Directory("", [], []);
    
    public static get root() : Directory 
    {
        return VirtualFileSystemInstance._root;
    }
    public static set root(newRoot : Directory) 
    {
        VirtualFileSystemInstance._root = newRoot;
    }
}
