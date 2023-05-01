export class Data
{
    private _pathes : string[] = [];

    public set pathes(pathes : string[])
    {
        this._pathes = pathes;
    }
    public get pathes()
    {
        return this._pathes;
    }
    public addPathes(pathes : string) : boolean
    {
        try 
        {
            this._pathes.push(pathes);
        } 
        catch (error) 
        {
            return false;
        }
        finally
        {
            return true;
        }
    }
}
