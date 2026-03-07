'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const LocalList = ({locales, cargando}) => {
    const router = useRouter();
    const [verTodos, setVerTodos] = useState(false);

    if (cargando) {
        return (
            <div className="flex justify-center py-20">
                <p className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">Cargando locales...</p>
            </div>
        );
    }
    if(locales.length === 0){
        return (
            <div className="flex flex-col items-center py-20 gap-2">
                <span className="text-4xl">🍽️</span>
                <p className="text-stone-400 text-sm">No hay locales disponibles.</p>
            </div>
        );
    }
    const priceColor = {
        ECONOMICO: "bg-green-50 text-green-600",
        MEDIO: "bg-amber-50 text-amber-600",
        ALTO: "bg-red-50 text-red-500",
    };

    const localesAMostrar = verTodos ? locales : locales.slice(0,9);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {localesAMostrar.map((local) => (
                <div 
                    key={local.id}
                    onClick={() => router.push(`/DetalleLocal/${local.id}`)}
                    className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer overflow-hidden"
                >
                    <img
                        src={local.photos?.[0] || "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg?w=740"}
                        alt={local.name}
                        className="w-full h-40 object-cover"
                    />
                    <div className="p-4 space-y-2">
                        <h3 className="font-bold text-stone-800 text-base">{local.name}</h3>
                        <p className="text-xs text-stone-400">{local.city} · {local.zone}</p>
                        <div className="flex gap-2 flex-wrap pt-1">
                            {local.type && (
                                <span className="text-xs bg-stone-100 text-stone-500 px-2.5 py-1 rounded-full">
                                    {local.type}
                                </span>
                            )}
                            {local.priceRange && (
                                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priceColor[local.priceRange] ?? "bg-stone-100 text-stone-500"}`}>
                                    {local.priceRange}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {locales.length > 9 && (
                <div className="flex justify-center pt-2">
                    <button
                        onClick={() => setVerTodos(!verTodos)}
                        className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
                    >
                        {verTodos ? "Ver menos ↑" : `Ver todos (${locales.length}) ↓`}
                    </button>
                </div>
            )}
        </div>
    );
}
export default LocalList;