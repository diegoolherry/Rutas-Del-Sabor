'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocales, getPlatos } from "../../api/api";

import FiltersLocal from "../../components/FiltersLocal";
import FiltersPlato from "../../components/FiltersPlato";
import Header from "../../components/Header";
import LocalList from "../../components/LocalList";
import PlatoList from "../../components/PlatoList";
import Footer from "../../components/Footer";

export default function Home() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [locales, setLocales] = useState([]);
  const [cargandoLocales, setCargandoLocales] = useState(true);

  const [platos, setPlatos] = useState([]);
  const [cargandoPlatos, setCargandoPlatos] = useState(true);

  const [filtersLocal, setFiltersLocal] = useState({
    q: "",
    type: "",
    city: "",
    priceRange: "",
    rating: "",
    zone: "",
  });

  const [filtersPlatos, setFiltersPlatos] = useState({
    q: "",
    category: "",
    city: "",
    zone: "",
    dateFrom: "",
    dateTo: "",
    localId: "",
  });

  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    setToken(savedToken);
    const savedUserId = localStorage.getItem("userId");
    setUserId(savedUserId);
  }, []);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        setCargandoLocales(true);
        const data = await getLocales(filtersLocal);
        setLocales(data.items);
      } catch (error) {
        console.error("Error al obtener locales:", error);
      } finally {
        setCargandoLocales(false);
      }
    };

    fetchLocales();
  }, [filtersLocal]);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        setCargandoPlatos(true);
        const data = await getPlatos(filtersPlatos);
        setPlatos(data.items);
      } catch (error) {
        console.error("Error al obtener platos:", error);
      } finally {
        setCargandoPlatos(false);
      }
    };

    fetchPlatos();
  }, [filtersPlatos]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header token={token} setToken={setToken} router={router} userId={userId} />

      <div className="bg-red-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Rutas del Sabor</h1>
        <p className="text-red-100 mt-2 text-base sm:text-lg">Descubrí los mejores locales cerca tuyo</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <FiltersLocal filters={filtersLocal} setFilters={setFiltersLocal} />
        <LocalList locales={locales} cargando={cargandoLocales} />

        <FiltersPlato filters={filtersPlatos} setFilters={setFiltersPlatos} />
        <PlatoList platos={platos} cargando={cargandoPlatos} />
      </div>

      <Footer />
    </div>
  );
}