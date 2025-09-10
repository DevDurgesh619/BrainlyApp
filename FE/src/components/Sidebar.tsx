import { LogoIcon } from "../icons/Logo";
import { TwitterIcon } from "../icons/Twitter";
import { SidenarItem } from "./SidebarItem";

export function Sidebar(){
    return(
        <div className="h-screen pl-6 w-72 border-r top-0 left-0  fixed bg-white">
            <div className="flex items-center text-2xl pt-8">
                <div className="pr-2 text-purple-600">
                    <LogoIcon />
                </div>
                Brainly
            </div>
            <div className="pt-8  pl-4">
                <SidenarItem text="Twitter" icon={<TwitterIcon size="md"/>}/>
                <SidenarItem text="Youtube" icon={<TwitterIcon size="md"/>}/>
            </div>

        </div>
    )
}