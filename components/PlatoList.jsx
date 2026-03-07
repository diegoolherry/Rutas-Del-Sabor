'use client';
import { useState, useEffect } from "react";
import { getPlatos } from "../api/api";
import Link from "next/link";

const PlatoList = () => {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const data = await getPlatos();
                console.log(data);
                setPlatos(data.items || []);
            } catch (error) {
                console.error("No hay platos disponibles", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlatos();
    }, []);

    if (loading) {
        return <div>Cargando platos</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestros Platos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platos.map((plato) => (
                    <Link key={plato.id} href={`/platos/${plato.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-4">
                            <h3 className="text-xl font-bold text-gray-800">{plato.name}</h3>
                            <p className="text-gray-600 mt-2">{plato.description}</p>
                            <p className="text-lg font-bold text-red-600 mt-4">${Number(plato.price).toFixed(2)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PlatoList;