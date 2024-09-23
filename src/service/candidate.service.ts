import Api from "@/api.ts";

class CandidateService {
    getAll() {
        return Api.get("/users/candidates")
    }
}
export default new CandidateService();