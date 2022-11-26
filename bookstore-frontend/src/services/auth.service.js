import createApiClient from "./api.service";
class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }
    async signIn(data) {
        return (await this.api.post("/signin", data)).data;
    }
    async signUp(data) {
        return (await this.api.post("/signup", data)).data;
    }
    async verifyToken(){
        return (await this.api.get("/getinfo")).data;
    }
    async signOut(){
        return (await this.api.get("/signout")).data;
    }
    async updateInfoUser(id,data) {
        return (await this.api.put(`/updateinfouser/${id}`, data)).data;
    }
    async changePassword(id,data) {
        return (await this.api.put(`/changepassword/${id}`, data)).data;
    }
}
export default new AuthService();