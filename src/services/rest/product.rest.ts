import { http } from "../config/config";

export class ProductRest {
    constructor(private baseURL: string = "/api"){
        this.baseURL = baseURL;
    }
    
    async getAllProducts(params: any){
        const path = "/products"
        return http.get(path, params);
    }
}