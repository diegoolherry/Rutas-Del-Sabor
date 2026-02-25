const LocalList = ({locales, cargando}) => {
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
                    <p>{local.name}</p>
                    <p>{local.city} - {local.zone}</p>
                    <p>Tipo: {local.type}</p>
                    <p>Precio: {local.priceRange}</p>
                </div>
            ))}
        </div>
    );
}
export default LocalList;