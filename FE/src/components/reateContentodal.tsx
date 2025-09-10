import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "./Config";

enum ContentType{
    Youtube="youtube",
    Twitter="twitter"
}
//controlled component
export function CreateContentModal({open,onClose}){
     const titleRef= useRef<HTMLInputElement>(null);
     const linkRef = useRef<HTMLInputElement>(null);
     const [type,setType]=useState(ContentType.Youtube)
    async function addContent(){
         const title = titleRef.current?.value;
         const link = linkRef.current?.value;
         await axios.post(`${BACKEND_URL}/api/v1/content`,{
            link,
            title,
            type
         },{
            headers:{
                "Authorization": localStorage.getItem("token")
            }
         })
         onClose()
    }
    return ( <div>
        {open && <div>
        
        <div className="w-full h-full bg-slate-500 fixed top-0 left-0 opacity-60
        flex justify-center">
        </div>
         <div className="w-full h-full fixed top-0 left-0 
        flex justify-center">
           <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="hover:cursor-pointer">
                            <CrossIcon size="md"/>
                        </div>
                    </div>
                    <div>
                        <Input refrence={titleRef} placeholdar={"title"}/>
                        <Input refrence={linkRef} placeholdar={"link"}/>
                    </div>
                    <div>
                        <h1>Type</h1>
                        <div className="flex gap-1 p-4 justify-center pb-2">
                             <Button size ="md" text="Youtube" variants={type===ContentType.Youtube ? "primary" : "secondary"} onClick={()=>{
                           setType(ContentType.Youtube)
                        }}/>
                        <Button size ="md" text="Twitter" variants={type===ContentType.Twitter ? "primary" : "secondary"}  onClick={()=>{
                            setType(ContentType.Twitter)}}/>
                        </div>
                        
                    </div>
                    <div className="flex justify-center">
                          <Button onClick={addContent}variants="primary" text="Sumbit" size="md"/>
                    </div>
                    
                </span>
            </div>
        </div>
            
        </div>}
    </div>
       
    )

}
