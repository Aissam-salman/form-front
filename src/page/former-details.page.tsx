import {useParams} from "react-router-dom";

const FormerDetailsPage = () => {
    const {formerId} = useParams();
    const {address} = useParams();
    const {phone_number} = useParams();

    return (
        <div className=" mx-auto grid w-[600px] gap-5">
            <h1 className="text-3xl font-bold"> Information détaillées sur le formateur </h1>
            <p className="text-balance text-muted-foreground">Identifiant : {formerId}</p>
            <p className="text-balance text-muted-foreground">Adresse : {address}</p>
            <p className="text-balance text-muted-foreground">N° téléphone : {phone_number}</p>

        </div>
    );
};

export default FormerDetailsPage;