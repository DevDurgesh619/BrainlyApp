import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../components/Config";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const PasswordRef= useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    async function signup(){
        const username= usernameRef.current?.value;
        const password= PasswordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup",{
                username,
                password
        })
        navigate("/signin")
    }
    return(
        <div className="flex justify-center items-center bg-gray-200 h-screen w-screen">
            <div className="bg-white border rounded-xl min-w-48 p-8">
                <Input refrence={usernameRef} placeholdar="Username"/>
                <Input refrence={PasswordRef} placeholdar="Password"/>
                <div className="flex justify-center pt-4">
                    <Button onClick={signup} variants="primary" text="Signup" size="md" fullWidth={true} loading={false}/>
                </div>
            </div>
        </div>
    )
}