const Filters = ({ filters, setFilters }) => {

    const handleOnChange = (filter, value) => {
        setFilters(prev => ({ ...prev, [filter]: value }));
    }
    return (
        <div>
            <input
                type="text"
                placeholder="Buscar locales..."
                value={filters.q}
                onChange={(e) => handleOnChange("q", e.target.value)}
            />
            <select value={filters.city} onChange={(e) => handleOnChange("city", e.target.value)}>
                <option value="">Todas las ciudades</option>
                <option value="Montevideo">Montevideo</option>
                <option value="Colonia">Colonia</option>
                <option value="Juan Lacaze">Juan Lacaze</option>

            </select>

            <select value={filters.type} onChange={(e) => handleOnChange("type", e.target.value)}>
                <option value="">Todos los Tipos</option>
                <option value="RESTAURANTE">Restaurante</option>
                <option value="CAFETERIA">Cafetería</option>
                <option value="BAR">Bar</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="OTROS">Otros</option>
            </select>

            <select value={filters.priceRange} onChange={(e) => handleOnChange("priceRange", e.target.value)}>
                <option value="">Todos los rangos de precio</option>
                <option value="ECONOMICO">Economico</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
            </select>
      
            <select value={filters.rating} onChange={(e) => handleOnChange("rating", e.target.value)}>
                <option value="">Todas las calificaciones</option>
                <option value="1">1 Estrella</option>
                <option value="2">2 Estrellas</option>
                <option value="3">3 Estrellas</option>
                <option value="4">4 Estrellas</option>
                <option value="5">5 Estrellas</option>
            </select>

            <input 
                type="text"
                placeholder="Zona..."
                value={filters.zone}
                onChange={(e) => handleOnChange("zone", e.target.value)}
            />
        </div>
    );
}
export default Filters;