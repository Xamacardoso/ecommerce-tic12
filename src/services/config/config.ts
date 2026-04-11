import { api } from ".";

export interface IHttpClient {
    get(path: string, params: any, baseURL?: string): Promise<any>;
    post(path: string, body: any, baseURL?: string): Promise<any>;
    put(path: string, body: any, baseURL?: string): Promise<any>;
    delete(path: string, params: any, baseURL?: string): Promise<any>;
}

export class HttpClient implements IHttpClient {
    constructor(private baseURL: string = "/api"){
        this.baseURL = baseURL;
    }
    async get(path: string, params: any, baseURL?: string): Promise<any> {
        return api.get(path, {params,baseURL}).then((res)=>res.data.data);
    }
    async post(path: string, body: any, baseURL?: string): Promise<any> {
        return api.post(path, body, {baseURL}).then((res)=>res.data.data);
    }
    async put(path: string, body: any, baseURL?: string): Promise<any> {
        return api.put(path, body, {baseURL}).then((res)=>res.data.data);
    }
    async delete(path: string, params: any, baseURL?: string): Promise<any> {
        return api.delete(path, {params,baseURL}).then((res)=>res.data.data);
    }
}

// exporta a instancia do HttpClient que será usada em toda a aplicação
export const http = new HttpClient();