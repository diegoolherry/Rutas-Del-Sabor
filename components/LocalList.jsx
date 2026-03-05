'use client'

import { useRouter } from "next/navigation";

const LocalList = ({locales, cargando}) => {
    const router = useRouter();

    if (cargando) {
        return <p>Cargando locales...</p>;
    }
    if(locales.length === 0){
        return <p>No hay locales disponibles.</p>;
    }

    return (
        <div>
            {locales.map((local) => (
                <div key={local.id}>
                    <p onClick={() => router.push(`/DetalleLocal/${local.id}`)}>{local.name}</p>
                    <p>{local.city} - {local.zone}</p>
                    <p>Tipo: {local.type}</p>
                    <p>Precio: {local.priceRange}</p>
                </div>
            ))}
        </div>
    );
}
export default LocalList;