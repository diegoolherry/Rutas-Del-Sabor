const Footer = () => {
    return (
        <footer className="bg-white border-t border-stone-100 py-5 px-6 mt-12">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <span className="text-sm font-bold text-red-600 tracking-tight">Rutas del Sabor</span>
                <span className="text-xs text-stone-400">© {new Date().getFullYear()} Rutas del Sabor. Todos los derechos reservados.</span>
            </div>
        </footer>
    );
}

export default Footer;