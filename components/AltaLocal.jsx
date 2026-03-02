'use client';

import { useState, useEffect } from "react";
import Header from "../components/Header";
import { postLocal } from "../api/api";
import { useRouter } from "next/navigation";

const AltaLocal = () => {

    const [local, setLocal] = useState({
        name: "",
        type: "",
        priceRange: "",
        city: "",
        zone: "",
        address: "",
        hours: "",
        photos: []
    })
    const [photo, setPhoto] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);  
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
        }
    }, []);


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
                type: "",
                priceRange: "",
                city: "",
                zone: "",
                address: "",
                hours: "",
                photos: []
            });
            router.push("/PerfilUsuario");
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
            <Header token={token} setToken={setToken} router={router} />
            <h1>Alta de Local</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={local.name} onChange={(e) => setLocal(prev => ({...prev, name: e.target.value}))} />

                <select value={local.type} onChange={(e) => setLocal(prev => ({...prev, type: e.target.value}))}>
                    <option value="RESTAURANTE">Restaurante</option>
                    <option value="CAFETERIA">Cafetería</option>
                    <option value="BAR">Bar</option>
                    <option value="FOOD_TRUCK">Food Truck</option>
                    <option value="OTROS">Otros</option>
                </select>

                <select value={local.priceRange} onChange={(e) => setLocal(prev => ({...prev, priceRange: e.target.value}))}>
                    <option value="ECONOMICO">Economico</option>
                    <option value="MEDIO">Medio</option>
                    <option value="ALTO">Alto</option>
                </select>

                <input type="text" placeholder="Ciudad" value={local.city} onChange={(e) => setLocal(prev => ({...prev, city: e.target.value}))} />
                <input type="text" placeholder="Zona" value={local.zone} onChange={(e) => setLocal(prev => ({...prev, zone: e.target.value}))} />
                <input type="text" placeholder="Dirección" value={local.address} onChange={(e) => setLocal(prev => ({...prev, address: e.target.value}))} />
                <input type="text" placeholder="Horario" value={local.hours} onChange={(e) => setLocal(prev => ({...prev, hours: e.target.value}))} />
                <input type="text" placeholder="URL de la foto" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                <button onClick={handleAddPhoto}>Agregar Foto</button>

                <button type="submit" disabled={cargando}>{cargando ? "Creando..." : "Agregar Local"}</button>
            </form>

            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    )
}

export default AltaLocal;