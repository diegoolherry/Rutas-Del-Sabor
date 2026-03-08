'use client';

import { useState } from "react";
import { postLocal } from "../api/api";
import { useRouter } from "next/navigation";

const AltaLocal = ({userId}) => {

    const [local, setLocal] = useState({
        name: "",
        type: "RESTAURANTE",
        priceRange: "ECONOMICO",
        city: "",
        zone: "",
        address: "",
        hours: "",
        photos: []
    })
    const [photo, setPhoto] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleAddPhoto = (e) => {
        e.preventDefault();
        if(photo.trim() === "") return;
        setLocal(prev => ({...prev, photos: [...prev.photos, photo]}));
        setPhoto("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        try{
            await postLocal(local);
            setLocal({
                name: "",
                type: "RESTAURANTE",
                priceRange: "ECONOMICO",
                city: "",
                zone: "",
                address: "",
                hours: "",
                photos: []
            });
            router.push(`/PerfilUsuario/${userId}`);
        }
        catch(error){
            setError(error.message);
        }
        finally{
            setCargando(false);
        }
    }    


    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Alta de Local</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="form-style">
                <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Nombre
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                            <input 
                                id="name"
                                name="name"
                                type="text" 
                                placeholder="Nombre" 
                                value={local.name} onChange={(e) => setLocal(prev => ({...prev, name: e.target.value}))}
                                className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                            />
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Tipo
                    </label>
                    <div className="mt-2">
                        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                            <select
                                id="type"
                                name="type"
                                aria-label="Type"
                                value={local.type}
                                onChange={(e) => setLocal(prev => ({...prev, type: e.target.value}))}
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            >
                                <option value="RESTAURANTE">Restaurante</option>
                                <option value="CAFETERIA">Cafetería</option>
                                <option value="BAR">Bar</option>
                                <option value="FOOD_TRUCK">Food Truck</option>
                                <option value="OTROS">Otros</option>
                            </select>
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Rango de Precio
                    </label>
                    <div className="mt-2">
                        <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                            <select
                                id="priceRange"
                                name="priceRange"
                                aria-label="Price Range"
                                value={local.priceRange}
                                onChange={(e) => setLocal(prev => ({...prev, priceRange: e.target.value}))}
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-7 pl-3 text-base text-gray-400 *:bg-gray-800 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            >
                                <option value="ECONOMICO">Economico</option>
                                <option value="MEDIO">Medio</option>
                                <option value="ALTO">Alto</option>
                            </select>
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Ciudad
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                            <input 
                                id="city"
                                name="city"
                                type="text" 
                                placeholder="Ciudad" 
                                value={local.city} onChange={(e) => setLocal(prev => ({...prev, city: e.target.value}))}
                                className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                            />
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Zona
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                            <input 
                                id="zone"
                                name="zone"
                                type="text" 
                                placeholder="Zona" 
                                value={local.zone} onChange={(e) => setLocal(prev => ({...prev, zone: e.target.value}))}
                                className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                            />
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Dirección
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                            <input 
                                id="address"
                                name="address"
                                type="text" 
                                placeholder="Dirección" 
                                value={local.address} onChange={(e) => setLocal(prev => ({...prev, address: e.target.value}))}
                                className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                            />
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        Horario
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                            <input 
                                id="hours"
                                name="hours"
                                type="text" 
                                placeholder="Horario" 
                                value={local.hours} onChange={(e) => setLocal(prev => ({...prev, hours: e.target.value}))}
                                className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                            />
                        </div>
                    </div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-white">
                        URL de la foto
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                            <input 
                                id="photo"
                                name="photo"
                                type="text" 
                                placeholder="URL de la foto" 
                                value={photo} onChange={(e) => setPhoto(e.target.value)}
                                className="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" 
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-12 h-full">
                        <div className="bg-gradient-to-b from-stone-300/40 to-transparent p-[4px] rounded-[16px]">
                            <button onClick={handleAddPhoto} className="group p-[4px] rounded-[12px] bg-gradient-to-b from-white to-stone-200/40 shadow-[0_1px_3px_rgba(0,0,0,0.5)] active:shadow-[0_0px_1px_rgba(0,0,0,0.5)] active:scale-[0.995]">
                                <div className="bg-gradient-to-b from-stone-200/40 to-black/80 rounded-[8px] px-2 py-2">
                                    <div className="flex gap-2 items-center">
                                        <span className="font-semibold">Agregar Foto</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <button disabled={cargando} type="submit" title="Crear Local" className="cursor-pointer flex items-center fill-lime-400 bg-lime-950 hover:bg-lime-900 active:border active:border-lime-400 rounded-md duration-100 p-2">
                        {cargando ? 
                            <span className="text-sm text-lime-400 font-bold pr-1">Creando...</span>
                            :
                            <span className="text-sm text-lime-400 font-bold pr-1">Agregar Local</span>
                        }                        
                    </button>
                </div>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    )
}

export default AltaLocal;