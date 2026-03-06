'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocales } from "../../api/api";

import Filters from "../../components/Filters";
import Header from "../../components/Header";
import LocalList from "../../components/LocalList";

export default function Home() {
  const [token, setToken] = useState(null);
  const [locales, setLocales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filters, setFilters] = useState({
    q: "",
    type: "",
    city: "",
    priceRange: "",
    rating: "",
    zone: "",
  });
  const router = useRouter();
 
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    setToken(savedToken);
  }, []);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        setCargando(true);
        const data = await getLocales(filters);
        setLocales(data.items);
      } catch (error) {
        console.error("Error al obtener locales:", error);
      }finally {
        setCargando(false);
      }
    };

    fetchLocales();
  }, [filters]);

  return (
    <div>
      <Header token={token} setToken={setToken} router={router} />

      <h1>Bienvenido a Rutas del Sabor</h1>

      <Filters filters={filters} setFilters={setFilters} />

      <LocalList locales={locales} cargando={cargando} />
    </div>
  );
}
