import React, { useState, useEffect } from 'react'
import {
    Breadcrumbs as MUIBreadcrumbs, Button, Typography
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Common() {
    const [mypath, setPath] = useState(window.location.pathname == '/' ? '/home' : window.location.pathname);
    let pathnames_array = mypath == '/' ? ["home"] : mypath.split("/").filter((x) => x)
//    const [endPoint, setEndpoint] = useState(pathnames_array.at(-1))
    //const [type, setType] = useState("");
    const [data, setData] = useState([]);
    const [file, setfile] = useState(false);
    const [dir, setdir] = useState(false);
    const [bread, setBread] = useState([])
    const navigate = useNavigate();

    const navigateToContacts = () => {
        navigate('/contacts');
    };
  
    const navigateHome = (link) => {
      navigate(link);
      setPath(link)
    };
    
    useEffect(() => {
        console.log('fired', mypath)
        fetch("http://localhost:3001/api?path="+mypath)
        .then(res => res.json())
        .then((result)=>{
            if(result.file != false){
                setfile(result.file)
                setdir(false);
            }else{
                setfile(false)
                setdir(true);
                setData(result.dir)
            }
            setBread(result[0])
        });
    }, [mypath])

    return (
        <>
        {/**** BREADCRUMB ****/}
        <MUIBreadcrumbs aria-label="breadcrumb">
            {pathnames_array.map((ref, index) => {
                const link = `/${pathnames_array.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames_array.length - 1;
                return isLast ? (
                    <Typography key={ref}>{ref}</Typography>
                ) : (
                    <Button key={index} onClick={()=>navigateHome(link)}>
                        {ref}
                    </Button>
                );
            })}
        </MUIBreadcrumbs>

        {/**** PAGE CONTENT ****/}
        {file && <h1>This is a file : {file}</h1>}
        {dir && 
            data.map((ref, index)=>{
                    return(<li><Button key={index} onClick={()=>navigateHome(mypath+"/"+ref)}>{ref}</Button></li>)
            })
        }
      </>
    )
}