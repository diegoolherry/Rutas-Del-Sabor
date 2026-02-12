'use client';

import { useEffect, useState } from "react";


export default function Home() {
  const [token, setToken] = useState(null);
 
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    setToken(savedToken);
  }, []);

  return (
    <div>
      <h1>Bienvenido a Rutas del Sabor</h1>

      {token ? (
        <p>Iniciaste sesión con éxito.</p>
      ) : (
        <p>Por favor, inicia sesión o regístrate.</p>
      )}
    </div>
  );
}
