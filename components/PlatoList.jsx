'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const PlatoList = ({ platos, cargando }) => {
    const router = useRouter();
    const [verTodos, setVerTodos] = useState(false);

    if (cargando) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">Cargando platos...</p>
            </div>
        );
    }

    if (platos.length === 0) {
        return (
            <div className="flex flex-col items-center py-20 gap-2">
                <span className="text-4xl">🍴</span>
                <p className="text-stone-400 text-sm">No hay platos disponibles.</p>
            </div>
        );
    }

    const categoryColor = {
        ENTRADA:   "bg-amber-50 text-amber-600",
        PRINCIPAL: "bg-red-50 text-red-500",
        POSTRE:    "bg-pink-50 text-pink-500",
        BEBIDA:    "bg-blue-50 text-blue-500",
        OTROS:     "bg-stone-100 text-stone-500",
    };

    const platosAMostrar = verTodos ? platos : platos.slice(0, 9);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platosAMostrar.map((plato) => (
                <div
                    key={plato.id}
                    onClick={() => router.push(`/DetallePlato/${plato.id}`)}
                    className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                >
                    <div className="p-4 space-y-2">
                        <h3 className="font-bold text-stone-800 text-base">{plato.name}</h3>
                        <p className="text-xs text-stone-400 line-clamp-2">{plato.description}</p>
                        <div className="flex items-center justify-between pt-1">
                            <span className="text-sm font-bold text-red-600">
                                ${Number(plato.price).toFixed(2)}
                            </span>
                            {plato.category && (
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColor[plato.category] ?? "bg-stone-100 text-stone-500"}`}>
                                    {plato.category}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {platos.length > 9 && (
                <div className="col-span-full flex justify-center pt-2">
                    <button
                        onClick={() => setVerTodos(!verTodos)}
                        className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                        {verTodos ? "Ver menos ↑" : `Ver todos (${platos.length}) ↓`}
                    </button>
                </div>
            )}
        </div>
    );
}

export default PlatoList;