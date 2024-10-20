import Api from "@/api.ts";

class FormerService {
    getAll() {
        return Api.get("/users/formers");
    }
    delete(id: string) {
        return Api.delete(`/users/${id}`)
    }

    getOne(id: string) {
        return Api.get(`/users/${id}`);

    }
}

export default new FormerService();