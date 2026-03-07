const Filters = ({ filters, setFilters }) => {

    const handleOnChange = (filter, value) => {
        setFilters(prev => ({ ...prev, [filter]: value }));
    }

    const selectClass = "w-full sm:w-auto rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer";

    return (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Filtros</h2>
            <div className="flex flex-wrap gap-3">
                <input
                    type="text"
                    placeholder="Buscar locales..."
                    value={filters.q}
                    onChange={(e) => handleOnChange("q", e.target.value)}
                    className="flex-1 min-w-[180px] rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <select value={filters.city} onChange={(e) => handleOnChange("city", e.target.value)} className={selectClass}>
                    <option value="">Todas las ciudades</option>
                    <option value="Montevideo">Montevideo</option>
                    <option value="Colonia">Colonia</option>
                    <option value="Juan Lacaze">Juan Lacaze</option>
                </select>

                <select value={filters.type} onChange={(e) => handleOnChange("type", e.target.value)} className={selectClass}>
                    <option value="">Todos los tipos</option>
                    <option value="RESTAURANTE">Restaurante</option>
                    <option value="CAFETERIA">Cafetería</option>
                    <option value="BAR">Bar</option>
                    <option value="FOOD_TRUCK">Food Truck</option>
                    <option value="OTROS">Otros</option>
                </select>

                <select value={filters.priceRange} onChange={(e) => handleOnChange("priceRange", e.target.value)} className={selectClass}>
                    <option value="">Todos los precios</option>
                    <option value="ECONOMICO">Económico</option>
                    <option value="MEDIO">Medio</option>
                    <option value="ALTO">Alto</option>
                </select>

                <select value={filters.rating} onChange={(e) => handleOnChange("rating", e.target.value)} className={selectClass}>
                    <option value="">Todas las calificaciones</option>
                    <option value="1">⭐ 1 estrella</option>
                    <option value="2">⭐⭐ 2 estrellas</option>
                    <option value="3">⭐⭐⭐ 3 estrellas</option>
                    <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
                </select>

                <input
                    type="text"
                    placeholder="Zona..."
                    value={filters.zone}
                    onChange={(e) => handleOnChange("zone", e.target.value)}
                    className="w-full sm:w-36 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
            </div>
        </div>
    );
}

export default Filters;