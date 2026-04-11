import { useAuthStore } from "@/stores/auth"

export function authenticatedGuard(router: any) {
    router.beforeEach((to: any, from: any, next: any) => {
        const authStore = useAuthStore();
        
        if (to.meta.auth) {
            // verifica se o usuario esta logado
            if (authStore.isAuthenticated) {
                next();
            } else {
                next({ path: "/login" });
            }
        } else {
            next();
        }
    })
}