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
        <div>
            <div>
                <h2>{name}</h2>
                <p>¿Cual fue tu experiencia?</p>

                {!enviado ? (
                    <div>
                        <div>
                            {[1, 2, 3, 4, 5].map((estrella) => (
                                <button 
                                    key={estrella}
                                    onClick={() => setRating(estrella)}
                                    onMouseEnter={() => setHover(0)}
                                >
                                    <span
                                        style={{
                                            color: star <= (hover || rating) ? "#f59e0b" : "#d1d5db",
                                            textShadow:
                                            star <= (hover || rating)
                                                ? "0 0 8px rgba(245,158,11,0.4)"
                                                : "none",
                                        }}
                                    >
                                        ★
                                    </span>
                                </button>
                            ))}
                        </div>
                        <p>{hover || rating ? labels[hover || rating] : ""}</p>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Deja un comentario (opcional)..."
                            rows={3} 
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            style={{
                                background:
                                    rating > 0
                                        ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                                        : "#e5e7eb",
                                    cursor: rating > 0 ? "pointer" : 'not-allowed' 
                            }} 
                        >
                            Enviar Calificación
                        </button>
                    </div>
                ) : (
                    <div>
                        <h3>
                            ¡Gracias por tu reseña!
                        </h3>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RatingLocal;