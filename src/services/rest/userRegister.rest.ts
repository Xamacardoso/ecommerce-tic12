import { HttpClient, type IHttpClient } from "../config/config";

export class UserRegisterRest {
    constructor(private httpClient: IHttpClient = new HttpClient()) {}

    async registerUser(body: {
        name: string;
        email: string;
        password: string;
    }) : Promise<any> {
        const path = "/auth/register";
        return await this.httpClient.post(path, body);
    }
}