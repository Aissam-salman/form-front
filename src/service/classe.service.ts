import Api from "@/api.ts";
import {CreatePath} from "@/dto/CreatePath.ts";


class ClasseService {
    create(data: CreatePath) {
        return Api.post("/classes", data);
    }
    
    getAll() {
        return Api.get("/classes")
    }

    getOne(id: string) {
        console.log(Api.get(`/classes/${id}`));
        return Api.get(`/classes/${id}`)
    }

    delete(id: string) {
        return Api.delete(`/classes/${id}`)
    }

    addCandidateToClasse(classeId: string | undefined, candidateIds: string[]) {
        console.log(classeId, candidateIds);
        return Api.post(`/classes/${classeId}/candidates`, candidateIds);
    }
}

export default new ClasseService();