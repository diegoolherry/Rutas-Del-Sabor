'use client'

import { useState } from "react"
import { login } from "../../api/api";
import { useRouter } from "next/navigation";

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await login(username, password);
            localStorage.setItem("authToken", data.token);
            console.log("Inicio de sesión exitoso:", data);
            router.push("/");
        } catch(error){
            console.error("Error al iniciar sesión:", error.message);
        }
        setUsername("");
        setPassword("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Ingresar</button>
        </form>
    );
}