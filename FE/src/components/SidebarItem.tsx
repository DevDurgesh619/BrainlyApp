import type { ReactElement } from "react"

export function SidenarItem({text,icon}:{
    text:string,
    icon:ReactElement
}){
    return(
        <div className="flex items-center py-2 text-gray-700 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4
        transistion-all duration-150">
            <div className="pr-2 ">
                 {icon}
            </div>
            <div >
                 {text}
            </div>
            
        </div>
    )
}