'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PerfilComponent from "../../../components/PerfilComponent";
import Header from "../../../components/Header";

const PerfilUsuario = () => {

    const [token, setToken] = useState(null);
    const router = useRouter();
    const { id } = useParams;

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        if(!storedToken){
            router.push("/login");
            return;
        }

        setToken(storedToken);
    }, [])

    return (  
        <>
        <Header token={token} setToken={setToken} router={router} />
        <PerfilComponent userId={id} />
        </>
    )
}

export default PerfilUsuario;