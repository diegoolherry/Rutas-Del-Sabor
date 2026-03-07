'use client'

import { useState } from "react";
import { postReview } from "../api/api";

const RatingLocal = ({id , name , setRefresh}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [hover, setHover] = useState(0);
    const [enviado, setEnviado] = useState(false);

    const labels = {
        1: "Muy Malo",
        2: "Malo",
        3: "Regular",
        4: "Muy Bueno",
        5: "Exelente",
    };

    const handleSubmit = async () => {
        if(rating > 0){
            await postReview(id, rating, comment);

            setEnviado(true);
            setRefresh(true);
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
            <div className="space-y-4">
                <div>
                    <h2 className="text-lg font-bold text-stone-800">{name}</h2>
                    <p className="text-sm text-stone-400 mt-0.5">¿Cuál fue tu experiencia?</p>
                </div>

                {!enviado ? (
                    <div className="space-y-4">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((estrella) => (
                                <button
                                    key={estrella}
                                    onClick={() => setRating(estrella)}
                                    onMouseEnter={() => setHover(estrella)}
                                    onMouseLeave={() => setHover(0)}
                                    className="text-3xl transition-transform hover:scale-110 bg-transparent border-none cursor-pointer"
                                >
                                    <span
                                        style={{
                                            color: estrella <= (hover || rating) ? "#f59e0b" : "#d1d5db",
                                            textShadow: estrella <= (hover || rating)
                                                ? "0 0 8px rgba(245,158,11,0.4)"
                                                : "none",
                                        }}
                                    >
                                        ★
                                    </span>
                                </button>
                            ))}
                        </div>

                        <p className="text-sm font-medium text-amber-500 h-4">
                            {hover || rating ? labels[hover || rating] : ""}
                        </p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Dejá un comentario (opcional)..."
                            rows={3}
                            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none transition"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            style={{
                                background: rating > 0
                                    ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                                    : "#e5e7eb",
                                cursor: rating > 0 ? "pointer" : "not-allowed"
                            }}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
                        >
                            Enviar Calificación
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-6 gap-2">
                        <span className="text-4xl">🎉</span>
                        <h3 className="text-base font-semibold text-stone-700">¡Gracias por tu reseña!</h3>
                        <p className="text-sm text-stone-400">Tu opinión ayuda a otros usuarios.</p>
                    </div>
                )}
            </div>
        </div>    
    )
}

export default RatingLocal;