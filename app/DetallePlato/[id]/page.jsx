'use client'

import Header from "../../../components/Header";
import DetallePlato from "../../../components/DetallePlato";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Footer from "../../../components/Footer";

const DetalleLocalPage = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUserId = localStorage.getItem("userId");

        if (!storedToken && !storedUserId) {
            router.push("/login");
            return;
        }

        setToken(storedToken);
        setUserId(storedUserId);
    }, []);

    return (
        <>
            <Header token={token} setToken={setToken} router={router} userId={userId} />
            <DetallePlato id={id} />
            <Footer />
        </>
    );
}

export default DetalleLocalPage;