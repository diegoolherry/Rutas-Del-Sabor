'use client'

import { useEffect, useState } from "react"
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
            localStorage.setItem("userId", data.user.id);
            console.log("Inicio de sesión exitoso:", data);
            router.push("/Home");

        } catch(error){
            console.error("Error al iniciar sesión:", error.message);
        }
        setUsername("");
        setPassword("");
    }
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if(token){
        router.push("/Home");
      }
    }, [])

    return (
        <div className="h-screen font-sans bg-cover bg-center relative"style={{backgroundImage: "url('/fondoLogin.jpg')"}} >
        <div className="container mx-auto h-full flex flex-1 justify-center items-center ">
        <div className="w-full max-w-lg">
            <form 
              className="max-w-sm w-full px-6 pt-2 pb-1 bg-white/25 rounded-xl shadow-2xl border border-white/40"
              onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-center gap-2 mb-1">
                    <img src="/logo.png" alt="LogoRutasDelSabor" className="w-12 h-auto drop-shadow-2xl block" />
                    <p className="text-white font-bold text-lg leading-none m-0 p-0">LOGIN</p>
                </div>
              <div className="mt-2">
                <label className="block text-sm text-white" htmlFor="email">Usuario</label>
                <input 
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" 
                  type="text" 
                  id="username" 
                  placeholder="Ingrese su usuario" 
                  aria-label="usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>

              <div className="mt-2">
                <label className="block text-sm text-white" htmlFor="contraseña">Contraseña</label>
                <input 
                  className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                  type="password" 
                  id="password" 
                  placeholder="Ingrese su contraseña" 
                  aria-label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>

              <div className="mt-4 items-center flex justify-between">
                <button 
                  className="px-4 py-1 text-white font-light tracking-wider bg-red-700 hover:bg-red-500 rounded transition-colors cursor-pointer"
                  type="submit"
                >
                  Iniciar
                </button>
                <a 
                  className="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-500 transition-colors"
                  href="/register"
                >
                  ¿No tiene cuenta?
                </a>
              </div>

              
            </form>
          </div>
        </div>
      </div>
    );
}