const Header = ({token, setToken, router}) => {

    return (
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
    );
}
export default Header;