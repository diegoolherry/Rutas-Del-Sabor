'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import PerfilComponent from "../../../components/PerfilComponent";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

const PerfilUsuario = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if(!storedToken && !userId){
            router.push("/login");
            return;
        }

        setToken(storedToken);
        setUserId(userId);
    }, [])

    return (
        <>
        <Header token={token} setToken={setToken} router={router} userId={userId} />
        {userId && <PerfilComponent userId={userId} />}
        <Footer />
        </>
    )
}

export default PerfilUsuario;