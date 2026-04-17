import { User } from "@/models/user.model";
import { defineStore } from "pinia";

// Criando store com Options API para gerenciamento centralizado de autenticação
export const useAuthStore = defineStore('auth', {
    // State: fonte única da verdade para o status de autenticação
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null as User | null,
        accessToken: localStorage.getItem('accessToken') as string | null,
        refreshToken: localStorage.getItem('refreshToken') as string | null,
        loading: false
    }),

    // Getters: computados para acesso fácil e reativo ao estado
    getters: {
        getUser: (state) => state.user,
        getUserEmail: (state) => state.user?.email ?? 'Sem email',
        getRole: (state) => state.user?.role ?? null,
        isAuthenticated: (state) => !!state.accessToken
    },

    // Actions: métodos para modificar o estado (simulando chamadas de API)
    actions: {
        async login(credentials: { email: string; password: any }) {
            this.loading = true;
            
            // Simula um delay de rede de 1.5 segundos
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulação: se o email for 'admin@email.com', loga como ADMIN, senão CUSTOMER
                    const role = credentials.email.includes('admin') ? 'ADMIN' : 'CUSTOMER';
                    const mockUser = new User('1', 'Usuário Teste', credentials.email, role);
                    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(7);

                    if (credentials.email && credentials.password) {
                        this.setUser(mockUser);
                        this.setAccessToken(mockToken);
                        this.loading = false;
                        resolve(mockUser);
                    } else {
                        this.loading = false;
                        reject(new Error('Credenciais inválidas'));
                    }
                }, 1500);
            });
        },

        async register(userData: { name: string, email: string, password: any }) {
            this.loading = true;
            
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const mockUser = new User('1', userData.name, userData.email, 'CUSTOMER');
                    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(7);

                    if (userData.email && userData.password) {
                        this.setUser(mockUser);
                        this.setAccessToken(mockToken);
                        this.loading = false;
                        resolve(mockUser);
                    } else {
                        this.loading = false;
                        reject(new Error('Erro ao registrar usuário'));
                    }
                }, 1500);
            });
        },

        setUser(user: User | null) {
            this.user = user;
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.removeItem('user');
            }
        },
        
        setAccessToken(token: string | null) {
            this.accessToken = token;
            if (token) {
                localStorage.setItem('accessToken', token);
            } else {
                localStorage.removeItem('accessToken');
            }
        },

        setRefreshToken(token: string | null) {
            this.refreshToken = token;
            if (token) {
                localStorage.setItem('refreshToken', token);
            } else {
                localStorage.removeItem('refreshToken');
            }
        },

        logout() {
            this.setUser(null);
            this.setAccessToken(null);
            this.setRefreshToken(null);
        }
    }
})