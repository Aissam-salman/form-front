import Api from "@/api.ts";

class CandidateService {
    getAll() {
        return Api.get("/users/candidates")
    }
    delete(id: string) {
        return Api.delete(`/users/${id}`)
    }

    getOne(id: number | string | null) {
        return Api.get(`/users/${id}`);
    }
}
export default new CandidateService();