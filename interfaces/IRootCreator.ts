import CDirectory from "../classes/FileSystemElements/CDirectory"

export interface IRootCreator
{
    createRoot() : CDirectory;
}