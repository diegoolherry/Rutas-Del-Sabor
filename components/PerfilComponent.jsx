'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUser } from "../api/api";


export default function PerfilComponent() {
    const [user, setUser] = useState({});
    const [locales, setLocales] = useState([]);
    const router = useRouter();
    const param = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const data = await getUser(param.id);
                setUser(data);
                setLocales(data.locales);
            }
            catch(error){
                console.error("Error al obtener usuario:", error);
            }
        }
        fetchUser();
    }, [param.id]);

    return (  
        <div>
            <h3>Perfil de {user.name}</h3>
            <p>Username: {user.username}</p>
            <button onClick={() => router.push("/AltaLocal")}>Agrega un Local</button>
            <h2>Locales de {user.name}:</h2>
            <ul>
                {locales.map(local => (
                    <li key={local.id}>
                        {local.name}
                        <img
                            alt={local.name}
                            src={local.photos ? local.photos[0] : "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg?semt=ais_user_personalization&w=740&q=80"}
                        />
                        <p>{local.type}</p>
                        <p>{local.city}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}