'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../api/api";


export default function PerfilComponent({ userId }) {
    const [user, setUser] = useState(null);
    const [locales, setLocales] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            try{
                const data = await getUser(userId);
                setUser(data);
                setLocales(data.item.locales || []);
                console.log(data);
            }
            catch(error){
                console.error("Error al obtener usuario:", error);
            }
        }
        fetchUser();
    }, [userId]);

    if (!user || !user.item) return <p>Cargando perfil...</p>;

    return (  
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                        {user.item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">{user.item.name}</h3>
                        <p className="text-sm text-gray-400 mt-0.5">@{user.item.username}</p>
                    </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={() => router.push("/AltaLocal")}
                        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-sm font-medium rounded-xl"
                    >
                        + Agrega un Local
                    </button>
                    <button
                        onClick={() => router.push("/altaPlato")}
                        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white text-sm font-medium rounded-xl"
                    >
                        + Agrega un Plato
                    </button>
                </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Locales de <span className="text-indigo-600">{user.item.name}</span>
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {locales.map(local => (
                    <li
                        key={local.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <img
                            alt={local.name}
                            src={local.photos
                            ? local.photos[0]
                            : "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg?semt=ais_user_personalization&w=740&q=80"
                            }
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-900 text-base">{local.name}</h4>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {local.type && (
                                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-medium">
                                        {local.type}
                                    </span>
                                )}
                                {local.city && (
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                                        📍 {local.city}
                                    </span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

