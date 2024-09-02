import {useParams} from "react-router-dom";
import {useAuthStore} from "@/hooks/use-auth-store.ts";

const CandidatePage = () => {
    const {candidateId} = useParams();

    const token = useAuthStore((state) => state.token);
    const isConnected = useAuthStore((state) => state.isConnected);


    return (
        <div>
            {isConnected ? (
                <>
                <span>
                    candidateId: {candidateId}
                </span>
                    <span>
                    token: {token}
                </span>
                </>
            ) : "ceci est la page Candidat"}
        </div>
    );
};

export default CandidatePage;
