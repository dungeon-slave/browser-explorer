import * as fs from 'fs';
// import * as path from 'path';

export function getDir() : string[]
{
    let pathes : string[] = [];
    let input : HTMLInputElement = document.getElementById("folderInput") as HTMLInputElement;

    if (input.files != null) 
    {
        for (let i = 0; i < input.files?.length; i++) 
        {
            //pathes[i] = input.files[i].webkitRelativePath;
            console.log(input.files[i].webkitRelativePath);
        }
    }

    return pathes;
}