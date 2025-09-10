import type { AnyNode } from "postcss";

export function Input({placeholdar,refrence}:{placeholdar:string,refrence:any}){
    return(
        <div>
            <input placeholder={placeholdar} ref={refrence}type="text " className="px-4 py-2 border m-2" ></input>
        </div>
    )
}