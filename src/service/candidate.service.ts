import Api from "@/api.ts";

class CandidateService {
    getAll() {
        return Api.get("/users/candidates")
    }
    delete(id: string) {
        return Api.delete(`/users/${id}`)
    }

    getOne(id: string) {
        return Api.get(`/users/${id}`);
    }
}
export default new CandidateService();