const FiltersPlato = ({ filters, setFilters }) => {

    const handleOnChange = (filter, value) => {
        setFilters(prev => ({ ...prev, [filter]: value }));
    }

    const selectClass = "w-full sm:w-auto rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer";

    return (
        <div id="platos" className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Filtros</h2>
            <div className="flex flex-wrap gap-3">
                <input
                    type="text"
                    placeholder="Buscar platos..."
                    value={filters.q}
                    onChange={(e) => handleOnChange("q", e.target.value)}
                    className="flex-1 min-w-[180px] rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <select value={filters.category} onChange={(e) => handleOnChange("category", e.target.value)} className={selectClass}>
                    <option value="">Todas las categorías</option>
                    <option value="ENTRADA">Entrada</option>
                    <option value="PRINCIPAL">Principal</option>
                    <option value="POSTRE">Postre</option>
                    <option value="BEBIDA">Bebida</option>
                    <option value="OTROS">Otros</option>
                </select>

                <select value={filters.city} onChange={(e) => handleOnChange("city", e.target.value)} className={selectClass}>
                    <option value="">Todas las ciudades</option>
                    <option value="Montevideo">Montevideo</option>
                    <option value="Colonia">Colonia</option>
                    <option value="Juan Lacaze">Juan Lacaze</option>
                </select>

                <input
                    type="text"
                    placeholder="Zona..."
                    value={filters.zone}
                    onChange={(e) => handleOnChange("zone", e.target.value)}
                    className="w-full sm:w-36 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                />

                <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleOnChange("dateFrom", e.target.value)}
                    className="w-full sm:w-auto rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                />

                <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleOnChange("dateTo", e.target.value)}
                    className="w-full sm:w-auto rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                />

                <input
                    type="number"
                    placeholder="ID del local..."
                    value={filters.localId}
                    min={1}
                    onChange={(e) => handleOnChange("localId", e.target.value)}
                    className="w-full sm:w-36 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
            </div>
        </div>
    );
}

export default FiltersPlato;