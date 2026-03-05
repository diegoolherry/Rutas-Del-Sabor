'use client'

import { useState } from "react"
import { register } from "../../api/api";
import { useRouter } from "next/navigation";

export default function Register(){
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await register(username, name, password);
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userId", data.user.id);
            console.log("Registro exitoso:", data);
            router.push("/Home");
        } catch(error){
            console.error("Error al registrar:", error.message);
        }

        setUsername("");
        setName("");
        setPassword("");
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Registrar</button>
        </form>
    );
}
