const Header = ({token, setToken, router, userId}) => {
    
    const handleProfileClick = () => {
        if (token) {
            router.push(`/PerfilUsuario/${userId}`);
        } else {
            alert("Por favor, inicia sesión para ver tu perfil.");
        }
    }
    return (
        <header>
            {token ? (
                <button onClick={() => {
                localStorage.removeItem("authToken");
                setToken(null);
                router.push("/login");
            }}>Cerrar Sesión</button>
            ) : (
            <div>
                <p>No estás autenticado. Por favor, inicia sesión o regístrate.</p>
                <button onClick={() => router.push("/login")}>Login</button>
                <button onClick={() => router.push("/register")}>Register</button>
            </div>
            )}

            <img
                alt="Foto perfil"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv_rUJ2Ru3GR0Jxy2YTNH_jrVzX3_HY-THQ&s"
                onClick={handleProfileClick}
            />
        </header>
    );
}
export default Header;