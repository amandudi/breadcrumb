import React from "react"
import { Route } from "react-router-dom"
import { Button } from "@material-ui/core";
import { Roots as dir_structure } from "./Roots";      // import directory structure

// *** Loop through the directory structure and return current directory object ***
const dig = (obj, target) =>
    target in obj
        ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) return acc;
            if (typeof val === 'object') return dig(val, target);
        }, undefined);

export const Content = (roots) => {
    const {
        history,
        location: { pathname }
    } = roots;
    let mypath = pathname;
    const pathnames = mypath.split("/").slice(-1);
    const current_dir = pathnames.slice(-1);

    //* Handle for paramless URL i.e. localhost:3000 */
    if(current_dir[0] == ''){
        current_dir[0] = ['home']
        mypath = '/home';
    }

    var loc = dig(dir_structure, current_dir);
    if (loc.type == 'dir') {    // Print directory content and links to subdirs and files
        return (
            <ul>
                {Object.keys(loc.children).map((key, ind) => {
                    let link = mypath+"/"+Object.keys(loc.children)[ind];
                    return (
                        <li>
                            <Button className="MuiButton-textPrimary" onClick={() => history.push(link)}>{key}</Button>
                        </li>
                    )
                })}
            </ul>
        );
  }else if(loc.type == 'file'){   // Just print file name
    return(
        <>
            <h1>This is a file : {pathnames.slice(-1)}</h1>
        </>
    )
  }
}