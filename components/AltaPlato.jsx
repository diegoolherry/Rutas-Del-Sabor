'use client';

import { useState } from "react";
import { postPlato } from "../api/api";
import { useRouter } from "next/navigation";

const AltaPlato = () => {
    const [plato, setPlato] = useState({
        name: "",
        category: "",
        localId: "",
        city: "",
        price: "",
        description: "",
    });
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try{
            await postPlato(plato);
            setPlato({
                name: "",
                category: "",
                localId: "",
                city: "",
                price: "",
                description: ""
            });
            router.push("/Home");
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
            <div className="max-w-2xl mx-auto py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Agregar Nuevo Plato</h2>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Nombre del Plato</label>
                        <input
                            type="text"
                            value={plato.name}
                            onChange={(e) => setPlato(prev => ({...prev, name: e.target.value}))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Categoría</label>
                            <select value={plato.category}
                                onChange={(e) => setPlato(prev => ({...prev, category: e.target.value}))}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                required>
                                <option value="">Selecciona una categoría</option>
                                <option value="ENTRANTE">Entrante</option>
                                <option value="PRINCIPAL">Principal</option>
                                <option value="POSTRE">Postre</option>
                                <option value="BEBIDA">Bebida</option>
                                <option value="OTRO">Otro</option>
                            </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">ID del Local</label>
                        <input
                            type="text"
                            value={plato.localId}
                            onChange={(e) => setPlato(prev => ({...prev, localId: Number(e.target.value)}))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Ciudad</label>
                        <input
                            type="text"
                            value={plato.city}
                            onChange={(e) => setPlato(prev => ({...prev, city: e.target.value}))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Precio</label>
                        <input
                            type="number"
                            value={plato.price}
                            onChange={(e) => setPlato(prev => ({...prev, price: e.target.value}))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Descripción</label>
                        <textarea
                            value={plato.description}
                            onChange={(e) => setPlato(prev => ({...prev, description: e.target.value}))}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            rows="4"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={cargando}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity(50)"
                    >
                        {cargando ? "Cargando..." : "Agregar Plato"}
                        </button>
                    </form>
                </div>
            </div>
        );
    };
    
    export default AltaPlato;