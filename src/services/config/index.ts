import { useAuthStore } from "@/stores/auth";
import axios from "axios";

// classe responsavel por configurar o axios
export class AxiosConfig {
    // $instance: instancia do axios, o $ indica que é uma propriedade privada
    private $instance;
    constructor(private baseURL: string = "/api"){
        this.baseURL = baseURL;
        this.$instance = axios.create({
            baseURL: this.baseURL,
        });
    }
    
    // Interceptadores: interceptam as requisições antes de serem enviadas e as respostas antes de serem processadas
    // Útil para adicionar headers, verificar token, etc.
    setConfig(){
        // intercepta a requisição antes de ser enviada
        this.$instance.interceptors.request.use((config) => {
            // aqui podemos adicionar headers, verificar token, etc.
            const token = useAuthStore().accessToken;
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }) 

        // intercepta a resposta antes de ser processada
        this.$instance.interceptors.response.use((response) => {
            // aqui podemos verificar se a resposta foi bem sucedida, se tem erro, etc.
            return response;
        })

        return this.$instance;
    }
}

// exporta a instancia do axios configurada
export const api = new AxiosConfig().setConfig();