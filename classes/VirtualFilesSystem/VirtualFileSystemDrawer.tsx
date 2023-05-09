import React from 'react';
import Directory from "../FileSystemElements/Directory";
import File from "../FileSystemElements/File";
import { FileSystemElement } from "../FileSystemElements/FileSystemElement";

export class VirtrualFileSystemDrawer
{
    public static structure : JSX.Element;

    // constructor(element : FileSystemElement)
    // {
    //     this.structure = VirtrualFileSystemDrawer.drawStructure(element);
    // }

    public static drawStructure(element : FileSystemElement) : JSX.Element
    {
        if (element.isDirectory) 
        {
            let dirElement = element as Directory;

            return(
                <div key={dirElement.name}>
                    <p>{dirElement.name}</p>
                
                    {dirElement.files.map((file : File) => 
                    {
                        return VirtrualFileSystemDrawer.drawStructure(file);
                    })}
                    {dirElement.subDirectories.map((directory : Directory) => 
                    {
                        return VirtrualFileSystemDrawer.drawStructure(directory);
                    })}
                </div>
            );
        }
        else
        {
            let fileElement = element as File;

            return(
                <div key={fileElement.name}>
                    <p>{fileElement.name}</p>
                </div>
            );
        }
    }
}
