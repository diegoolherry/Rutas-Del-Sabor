'use client';

import { useEffect } from "react";

const Header = ({token, setToken, router}) => {
    
    useEffect(() => {
        const savedToken = localStorage.getItem("authToken");
        setToken(savedToken);
    }, []);

    const userId = localStorage.getItem("userId");
    
    const handleProfileClick = () => {
        if (token) {
            router.push(`/PerfilUsuario/${userId}`);
        } else {
            alert("Por favor, inicia sesión para ver tu perfil.");
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setToken(null);
        router.push("/login");
    }
    const handleRegister = () => {
        router.push("/register");
    }
    return (
        
   <nav className="bg-white px-6 py-3 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* IZQUIERDA: Logo e Imagen */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <img 
                        src="/logo.png" 
                        alt="Logo" 
                        className="h-10 w-10 object-contain rounded-full cursor-pointer"
                        onClick={()=> router.push("/")}
                    />
                    <h2 className="text-xl font-bold text-red-600 italic transition-colors duration-300 hover:text-red-800 cursor-pointer" onClick={()=> router.push("/")}>Rutas del Sabor</h2>
                </div>
      
                {/* CENTRO: Enlaces de Navegación */}
                <div className="flex gap-6 font-medium text-gray-600">
                    <a href="#locales" className="hover:text-red-600 transition-colors font-semibold">Locales</a>
                    <a href="#platos" className="hover:text-red-600 transition-colors font-semibold">Platos</a>
                </div>

                {/* DERECHA: Sesión e Icono de Usuario */}
                <div className="flex items-center gap-4">
                    {/* Sesión */}
                    <div className="flex items-center gap-4 text-sm font-semibold border-r pr-4 border-gray-200">
                        <button
                         onClick={handleLogout} 
                         className="text-gray-500 hover:text-gray-800 cursor-pointer">Cerrar Sesión</button>
                        <button
                        onClick={handleRegister} 
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm cursor-pointer">
                            Registrarse
                        </button>
                    </div>

                    {/* LOGO DE USUARIO (Acceso al Perfil) */}
                    <button 
                        onClick={handleProfileClick}
                        className="focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
                        title="Ver mi perfil"
                    >
                        <img 
                            src="/perfil.png" // Asegúrate de que el nombre del archivo sea el correcto
                            alt="Usuario" 
                            className="h-10 w-10 object-contain"
                        />
                    </button>
                </div>
            </div>
        </nav>
        
    );
}
export default Header;