export function getFilesPathes() : string[]
{
    let pathes : string[] = [];
    let input : HTMLInputElement = document.getElementById("folderInput") as HTMLInputElement;

    if (input.files != null) 
    {
        for (let i = 0; i < input.files.length; i++) 
        {
            pathes[i] = input.files[i].webkitRelativePath;
        }
    }

    return pathes;
}
