import {useParams} from "react-router-dom";

const FormerPage = () => {
    const {formerId} = useParams();

    return (
        <div>
                <span>
                    formerId: {formerId}
                </span>

            <h1>"Page du Formateur</h1>
        </div>
    );
};

export default FormerPage;
