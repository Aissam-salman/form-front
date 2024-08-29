import {useParams} from "react-router-dom";

const CandidatePage = () => {
    const {candidateId} = useParams();
    
    return (
        <div>
            {candidateId ? (
                <span>
                    candidateId: {candidateId}
                </span>
            ):"ceci est la page Candidat"}
        </div>
    );
};

export default CandidatePage;
