import createApiClient from "./api.service";
class CardService {
    constructor(baseUrl = "/api/card") {
        this.api = createApiClient(baseUrl);
    }
    async updateCart(id, data) {
        return (await this.api.post(`/updatecart/${id}`, data)).data;
    }
    // async signUp(data) {
    //     return (await this.api.post("/signup", data)).data;
    // }
    // async verifyToken(){
    //     return (await this.api.get("/getinfo")).data;
    // }
}
export default new CardService();