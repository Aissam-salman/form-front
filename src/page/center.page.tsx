import {useParams} from "react-router-dom";

const CenterPage = () => {
    const {centerId} = useParams();

    return (
        <div>
                <span>
                    centerId: {centerId}
                </span>

            <h1>Page du Center</h1>
        </div>
    );
};

export default CenterPage;
