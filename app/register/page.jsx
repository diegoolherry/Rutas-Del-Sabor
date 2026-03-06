'use client'

import { useState } from "react"
import { register } from "../../api/api";

export default function Register(){
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await register(username, name, password);
            localStorage.setItem("authToken", data.token);
            console.log("Registro exitoso:", data);
        } catch(error){
            console.error("Error al registrar:", error.message);
        }

        setUsername("");
        setName("");
        setPassword("");
    }


    return (
       <div 
      className="bg-no-repeat bg-cover bg-center relative" 
      style={{ 
        backgroundImage: 'url("/fondoRegister4.jpg")', 
      }}
    >
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
          <div className="self-start hidden lg:flex flex-col text-white">
            <img src="" className="mb-3" alt="" />
            <h1 className="mb-3 font-bold text-5xl drop-shadow-lg">Rutas del Sabor</h1>
            <p className="pr-3 drop-shadow-md">
                Descubre restaurantes, cafeterías, bares y food trucks.
                Comparte tus experiencias y reseñas con la comunidad.
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Crear Cuenta </h3>
              <p className="text-gray-500">Regístrate para comenzar a compartir y descubrir lugares gastronómicos.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Usuario</label>
                <input 
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 placeholder-gray-300 " 
                  type="username"
                  placeholder="Ingrese su nombre de usuario" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">Nombre</label>
                <input 
                  className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 placeholder-gray-300 " 
                  type="name" 
                  placeholder="Ingrese su Nombre" 
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">Contraseña</label>
                <input 
                  className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-400 placeholder-gray-300 " 
                  type="password" 
                  placeholder="Ingrese su contraseña" 
                />
              </div>
              <div className="flex items-center justify-between">
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full flex justify-center bg-red-400 hover:bg-red-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
                >
                  Crear
                </button>
              </div>
            </div>
              
            </div>
          </div>
        </div>
      </div>
    );
}