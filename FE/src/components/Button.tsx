import type { ReactElement } from "react";

export interface ButtonProps{
    variants: "primary" | "secondary";
    size:"sm" | "md" | "lg";
    text : string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?: ()=> void;
    fullWidth?:boolean
    loading?:boolean
}
const sizeStyles ={
    "sm":"px-2 py-1",
    "md":"px-4 py-2",
    "lg":"p-6"
}

const variantStyles ={
    "primary": "bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600"
} 
const defaultStyles = "rounded-md flex "

export const  Button = (props:ButtonProps)=>{

    return (
        <button onClick={props.onClick} className={`${variantStyles[props.variants]} ${defaultStyles}
         ${sizeStyles[props.size]} ${props.fullWidth ? " w-full flex justify-center items-center":""}
          ${props.loading ? " opacity-40":""}`}
         disabled={props.loading}>
            <div className="flex items-center">
                <div>
                {props.startIcon ? <div className="pr-1">{props.startIcon}</div>:null}
                </div>
                <div className="pl-1 pr-1">{props.text}</div>
            </div>
            </button>
    )
}
