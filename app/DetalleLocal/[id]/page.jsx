'use client'

import Header from "../../../components/Header";
import DetalleLocal from "../../../components/DetalleLocal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DetalleLocalPage = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
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
            <DetalleLocal />
        </>
    );
}

export default DetalleLocalPage;