import Api from "@/api.ts";
import {CreatePath} from "@/dto/CreatePath.ts";
import { Candidate } from "@/types/Candidate";


class ClasseService {
    create(data: CreatePath) {
        return Api.post("/classes", data);
    }
    
    getAll() {
        return Api.get("/classes")
    }

    getOne(id: string) {
        return Api.get(`/classes/${id}`)
    }

    delete(id: string) {
        return Api.delete(`/classes/${id}`)
    }
    addCandidateToClasse(classeId: string, candidate: Candidate) {
        return Api.post(`/classes/${classeId}/candidates`, candidate);
    }
}

export default new ClasseService();