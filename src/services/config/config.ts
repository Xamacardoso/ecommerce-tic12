import { api } from ".";

interface IHttp {
    get(path: string, params: any, baseURL?: string): Promise<any>;
    post(path: string, body: any, baseURL?: string): Promise<any>;
    put(path: string, body: any, baseURL?: string): Promise<any>;
    delete(path: string, params: any, baseURL?: string): Promise<any>;
}

export class HttpClient implements IHttp {
    constructor(private baseURL: string = "/api"){
        this.baseURL = baseURL;
    }
    get(path: string, params: any, baseURL?: string): Promise<any> {
        return api.get(path, {params,baseURL}).then((res)=>res.data);
    }
    post(path: string, body: any, baseURL?: string): Promise<any> {
        return api.post(path, {data: body, baseURL}).then((res)=>res.data);
    }
    put(path: string, body: any, baseURL?: string): Promise<any> {
        return api.put(path, {data: body, baseURL}).then((res)=>res.data);
    }
    delete(path: string, params: any, baseURL?: string): Promise<any> {
        return api.delete(path, {params,baseURL}).then((res)=>res.data);
    }
}

// exporta a instancia do HttpClient que será usada em toda a aplicação
export const http = new HttpClient();