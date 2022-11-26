import createApiClient from "./api.service";
class AuthorService {
    constructor(baseUrl = "/api/authors") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get(`/`)).data;
    }
    async getAnAuthor(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async getDataHome() {
        return (await this.api.get("/getdatahome")).data;
    }
    async getData(query) {
        return (await this.api.get('/getdata'+query)).data;
    }
    async getDataSuggest(caterogy,id) {
        return (await this.api.get('/getdatasuggest/'+caterogy+'/'+id)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new AuthorService();