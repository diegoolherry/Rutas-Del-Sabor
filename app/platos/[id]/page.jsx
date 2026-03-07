'use client';
import DetallePlato from "../../../components/DetallePlato";

export default function Page({ params }) {
    return <DetallePlato id={params.id} />;
}