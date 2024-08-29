import API from "@/api.ts";
import {AuthLogin} from "@/dto/AuthLogin.ts";
import {AuthRegister} from "@/dto/AuthRegister.ts";

class AuthService {
    login(data: AuthLogin) {
        return API.post("/login",data)
    }

    signup(data: AuthRegister) {
        return API.post("/signup",data)
    }
}

export default new AuthService();