'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLocal } from "../api/api";
import  RatingLocal  from "../components/RatingLocal"

const DetalleLocal = () => {
    const [local, setLocal] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const router = useRouter();
    const { id } = useParams();

    useEffect (() => {
        if(!id) return;
        const fetchLocal = async () => {
            const data = await getLocal(id);
            setLocal(data.item);
            console.log(data.item);
        }

        fetchLocal()
    }, [id, refresh])

    if (!local) return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <p className="text-stone-400 text-sm tracking-widest uppercase animate-pulse">Cargando...</p>
        </div>
    );

    const features = [
        {
            name: 'Ciudad.',
            description: local.city,
            icon: '🏙️'
        },
        {
            name: 'Zona.',
            description: local.zone,
            icon: '📍'
        },
        {
            name: 'Direccion.',
            description: local.address,
            icon: '🗺️'
        }
    ]

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <img
                    alt={local.name}
                    src={local.photos?.[0] ?? "https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-10">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow">
                        {local.name}
                    </h1>
                </div>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="sm:col-span-2 bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-4">
                        <p className="text-stone-600 leading-relaxed">{local.description}</p>
                        <button
                            onClick={() => router.push(`/PerfilUsuario/${local.creatorId}`)}
                            className="text-sm text-stone-400 hover:text-amber-600 transition-colors"
                        >
                            Por <span className="font-medium underline underline-offset-2">{local.creator?.name}</span>
                        </button>
                    </div>
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 space-y-4">
                        {features.map((f) => (
                            <div key={f.name} className="flex gap-3 items-start">
                                <span className="text-lg">{f.icon}</span>
                                <div>
                                    <p className="text-xs text-stone-400 uppercase tracking-wide">{f.name}</p>
                                    <p className="text-sm text-stone-700 font-medium">{f.description || '—'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                    <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                        Dejá tu reseña
                    </h3>
                    <RatingLocal id={local.id} name={local.name} setRefresh={setRefresh} />
                </div>
                {local.reviews?.length > 0 && (
                    <div>
                        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">
                            Reseñas ({local.reviews.length})
                        </h3>
                        <ul role="list" className="space-y-4">
                            {local.reviews.map((review) => (
                                <li key={review.id} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex gap-4">
                                    <img
                                        alt="imagen de usuario"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv_rUJ2Ru3GR0Jxy2YTNH_jrVzX3_HY-THQ&s"
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div>
                                        <Rating value={review.rating} readonly />
                                        <p className="text-stone-600 text-sm mt-1">{review.comment}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DetalleLocal;