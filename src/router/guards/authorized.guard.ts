import { useAuthStore } from "@/stores/auth"

export function authorizedGuard(router: any) {
    router.beforeEach((to: any, from: any, next: any) => {
        const authStore = useAuthStore();
        
        // verifica se o usuario tem role
        if (to.meta.role) {
            // verifica se a rota que o usuario ta tentando acessar condiz com o role dele
            if (to.meta.role.includes(authStore.getRole)) {
                next();
            } else {
                return;
            }

        // se nao tiver requisito de role na rota, deixa passar
        } else {
            next();
        }
    })  
}