import Directory from "../classes/FileSystemElements/Directory"

export interface IRootCreator
{
    newRoot() : Promise<Directory>;
}
