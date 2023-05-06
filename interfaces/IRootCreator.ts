import CDirectory from "../classes/FileSystemElements/СDirectory"

export interface IRootCreator
{
    createRoot() : CDirectory;
}