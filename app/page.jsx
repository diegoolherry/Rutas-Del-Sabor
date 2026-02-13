'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocales } from "../api/api";

export default function Home() {
  const [token, setToken] = useState(null);
  const [locales, setLocales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();
 
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    setToken(savedToken);
  }, []);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const data = await getLocales();
        console.log("Datos de locales:", data);
        setLocales(data.items);
      } catch (error) {
        console.error("Error al obtener locales:", error);
      }finally {
        setCargando(false);
      }
    };

    fetchLocales();
  }, []);

  return (
    <div>
      <header>
        {token ? (
          <button onClick={() => {
            localStorage.removeItem("authToken");
            setToken(null);
        }}>Cerrar Sesión</button>
      ) : (
        <div>
          <p>No estás autenticado. Por favor, inicia sesión o regístrate.</p>
          <button onClick={() => router.push("/login")}>Login</button>
          <button onClick={() => router.push("/register")}>Register</button>
        </div>
      )}
      </header>

      <h1>Bienvenido a Rutas del Sabor</h1>
      {cargando && <p>Cargando locales...</p>}
      {!cargando && locales.length === 0 && <p>No hay locales disponibles.</p>}
      {!cargando && locales.map((local) => (
        <div key={local.id}>
          <p>{local.name}</p>
          <p>{local.city} - {local.zone}</p>
          <p>Tipo: {local.type}</p>
          <p>Precio: {local.priceRange}</p>
        </div>
      ))}

    </div>
  );
}
