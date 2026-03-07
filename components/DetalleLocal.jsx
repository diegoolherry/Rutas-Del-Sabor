
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLocal } from "../api/api";
import { RatingLocal } from "../components/RatingLocal"




const DetalleLocal = () => {
    const [local, setLocal] = useState({});
    const [refresh, setRefresh] = useState(false);
    const params = useParams();
    const router = useRouter();


    const features = [
        {
            name: 'Ciudad.',
            description: local.city
        },
        {
            name: 'Zona.',
            description: local.zone,
        },
        {
            name: 'Direccion.',
            description: local.address,
        }
    ]

    useEffect (() => {
        const fetchLocal = async () => {
            const data = await getLocal(params.id);
            setLocal(data.item);
        }

        fetchLocal()
    }, [refresh])

    return (
        <div>
            <p>{local.name}</p>
            <p>{local.description}</p>

            <div>
                {features.map((feature) => (
                    <div key={feature.name}>
                        <h4>{feature.name}</h4>
                        <p>{feature.description}</p>
                    </div>
                ))}
                <p onClick={router.push(`/PerfilUsuario/${local.creatorId}`)}>{local.creator?.name}</p>
            </div>
            <div>
                <img
                alt="Product screenshot"
                src={local.photos? local.photos[0] : "https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"} 
                />
            </div>
            <RatingLocal id={local.id} name={local.name} setRefresh={setRefresh} />
            <ul role="lsit">
                {local.reviews?.map((review) => (
                    <li key={review.id}>
                        <div>
                            <img
                                alt="imagen de usuario"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv_rUJ2Ru3GR0Jxy2YTNH_jrVzX3_HY-THQ&s" 
                            />
                            <div>
                                <Rating value={review.rating} readonly />
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default DetalleLocal;