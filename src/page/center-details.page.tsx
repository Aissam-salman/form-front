import {useParams} from "react-router-dom";

const CenterDetailsPage = () => {
    const {centerId} = useParams();
    const {address} = useParams();
    const {phone_number} = useParams();

    return (
        <div className=" mx-auto grid w-[600px] gap-5">
            <h1 className="text-3xl font-bold"> Information détaillées sur le centre </h1>
            <p className="text-balance text-muted-foreground">Identifiant : {centerId}</p>
            <p className="text-balance text-muted-foreground">Adresse : {address}</p>
            <p className="text-balance text-muted-foreground">N° téléphone : {phone_number}</p>

        </div>
    );
};

export default CenterDetailsPage;