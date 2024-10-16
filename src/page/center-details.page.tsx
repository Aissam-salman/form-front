import {useParams} from "react-router-dom";

const CenterDetailsPage = () => {
    const {centerId} = useParams();

    return (
        <div>
            Page center details
            <p>Center Id: {centerId}</p>
        </div>
    );
};

export default CenterDetailsPage;