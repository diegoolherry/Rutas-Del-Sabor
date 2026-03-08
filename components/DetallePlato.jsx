'use client';
import { useState, useEffect } from "react";
import { getPlatoById } from "../api/api";
import RatingPlato from "./RatingPlato";

const categoryColor = {
    ENTRADA:   "bg-amber-50 text-amber-600",
    PRINCIPAL: "bg-red-50 text-red-500",
    POSTRE:    "bg-pink-50 text-pink-500",
    BEBIDA:    "bg-blue-50 text-blue-500",
    OTROS:     "bg-stone-100 text-stone-500",
};

const categoryLabel = {
    ENTRADA:   "Entrada",
    PRINCIPAL: "Principal",
    POSTRE:    "Postre",
    BEBIDA:    "Bebida",
    OTROS:     "Otros",
};

const DetallePlato = ({ id }) => {
    const [plato, setPlato] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!id) return;
        const fetchPlato = async () => {
            try {
                const data = await getPlatoById(id);
                setPlato(data.item);
            } catch (error) {
                console.error("Error al obtener plato:", error);
            }
        };
        fetchPlato();
    }, [id, refresh]);

    if (!plato) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">Cargando plato...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="bg-red-600 px-6 py-8">
                    <h1 className="text-2xl font-bold text-white">{plato.name}</h1>
                    {plato.category && (
                        <span className={`inline-block mt-3 text-xs px-3 py-1 rounded-full font-medium ${categoryColor[plato.category] ?? "bg-stone-100 text-stone-500"}`}>
                            {categoryLabel[plato.category] ?? plato.category}
                        </span>
                    )}
                </div>

                <div className="p-6 space-y-5">
                    <p className="text-stone-600 text-sm leading-relaxed">{plato.description}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                        <span className="text-2xl font-bold text-red-600">${Number(plato.price).toFixed(2)}</span>
                    </div>

                    {(plato.local || plato.city) && (
                        <div className="flex items-center gap-2 text-sm text-stone-500 pt-1">
                            <span>📍</span>
                            <span>
                                {plato.local?.name && <span className="font-medium text-stone-700">{plato.local.name}</span>}
                                {plato.local?.name && plato.city && " · "}
                                {plato.city}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mt-6">
                <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                    Dejá tu reseña
                </h3>
                <RatingPlato
                    id={plato.id}
                    name={plato.name}
                    setRefresh={() => setRefresh(prev => !prev)}
                />
            </div>

            {plato.reviews && plato.reviews.length > 0 && (
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 mt-6">
                    <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                        Reseñas
                    </h3>
                    <div className="space-y-4">
                        {plato.reviews.map((review, index) => (
                            <div key={index} className="border-b border-stone-100 pb-4">
                                <div className="text-amber-500 text-sm">
                                    {"★".repeat(review.rating)}
                                </div>
                                {review.comment && (
                                    <p className="text-sm text-stone-600 mt-1">
                                        {review.comment}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetallePlato;