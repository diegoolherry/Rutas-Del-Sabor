'use client';
import { useState, useEffect } from "react";
import { getPlatoById, getPlatos } from "../api/api";

const DetallePlato = ({ id }) => {
    const [plato, setPlato] = useState(null);

    useEffect(() => {
        const fetchPlato = async () => {
            const data = await getPlatoById(id);
            setPlato(data);
        };

        fetchPlato();
    }, [id]);

    if (!plato) {
        return <div>Cargando plato</div>;
    }
    return (
        <div className="max-w-2xl mx-auto py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{plato.name}</h2>
            <p className="text-gray-600">{plato.description}</p>
            <p className="text-lg font-bold text-red-600 mt-4">${Number(plato.price).toFixed(2)}</p>
        </div>
    );
};

export default DetallePlato;