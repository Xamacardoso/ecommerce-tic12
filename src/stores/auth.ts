import { User } from "@/models/user.model";
import { defineStore } from "pinia";
import { ref } from "vue";

// Criando store com Options API, que é a forma mais tradicional
export const useAuthStore = defineStore('auth', {
    // State: é a função que retorna o estado inicial do store
    state: () => ({
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : new User('1', 'Testando', 'testona@email.com', 'ADMIN'),

        // toda vez que a pagina for recarregada, ele vai pegar o token do localStorage
        accessToken: localStorage.getItem('accessToken') as null | string,
        refreshToken: localStorage.getItem('refreshToken') as null | string
    }),

    // Getters: são funções que retornam o valor do estado
    getters: {
        getUser: (state) => state.user,
        getUserEmail: (state) => state.user?.email ?? 'Sem email',
        getRole: (state) => state.user?.role ?? null,
        isAuthenticated: (state) => state.accessToken !== null
    },

    // Actions: são funções que modificam o estado do store (global)
    actions: {
        setUser(user: User) {
            this.user = user
        },
        
        setUserEmail(email: string) {
            this.user!.email = email
        },   

        setAccessToken(token: string) {
            this.accessToken = token

            // Armazena o token no localStorage para que ele fique disponivel mesmo se der um refresh na pagina
            localStorage.setItem('accessToken', token)
        },

        setRefreshToken(token: string) {
            this.refreshToken = token

            // Persistencia entre refresh de pagina
            localStorage.setItem('refreshToken', token)
        },

        logout() {
            this.user = new User()
            this.accessToken = null
            this.refreshToken = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }
    }
    
})