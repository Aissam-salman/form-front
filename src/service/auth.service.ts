import API from "@/api.ts";
import { AuthForgotPassword } from "@/dto/AuthForgotPassword";
import {AuthLogin} from "@/dto/AuthLogin.ts";
import {AuthRegister} from "@/dto/AuthRegister.ts";
import { AuthResetPassword } from "@/dto/AuthResetPassword";

class AuthService {
    login(data: AuthLogin) {
        return API.post("auth/login",data)
    }

    signup(data: AuthRegister) {
        return API.post("auth/signup",data)
    }
    forgotPassword(data: AuthForgotPassword) {
        return API.post("auth/forgot-password", data);
    }

    resetPassword(data: AuthResetPassword) {
        return API.post("auth/reset-password", data);
    }
}

export default new AuthService();