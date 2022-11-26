import createApiClient from "./api.service";
class OrderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async updateCart(id, data) {
        return (await this.api.post(`/updatecart/${id}`, data)).data;
    }
    async addOrder(data) {
        return (await this.api.post(`/addorder`, data)).data;
    }
    async confirmOrder(id, data) {
        return (await this.api.put(`/confirmorder/${id}`, data)).data;
    }
    // async signUp(data) {
    //     return (await this.api.post("/signup", data)).data;
    // }
    // async verifyToken(){
    //     return (await this.api.get("/getinfo")).data;
    // }
}
export default new OrderService();