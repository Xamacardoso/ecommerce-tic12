<template>
    <div class="flex flex-col min-h-screen">
        <Menubar :model="items" class="p-4 flex flex-row items-center gap-4">
            <template #item="{ item, props }">
                <RouterLink :to="item.route" v-slot="{ href, navigate}" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon"/>
                        <span class="ml-2">{{ item.label }}</span>
                    </a>
                </RouterLink>
            </template>

            <!-- Area para o carrinho e usuário -->
            <template #end>
                <div class="flex items-center gap-4">
                    <CartComponent />
                    
                    <router-link to="/checkout" class="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer no-underline text-inherit">
                        <i class="pi pi-shopping-cart text-xl" />
                        <span class="font-bold hidden sm:inline">Carrinho ({{ totalItems }})</span>
                    </router-link>

                    <Divider layout="vertical" />

                    <div v-if="!authStore.isAuthenticated" class="flex items-center gap-2">
                        <Button label="Login" icon="pi pi-sign-in" text @click="$router.push('/login')" />
                    </div>
                    
                    <div v-else class="flex items-center gap-3">
                        <Avatar icon="pi pi-user" shape="circle" class="bg-primary text-white" />
                        <span class="font-medium hidden md:inline">{{ authStore.user?.name }}</span>
                        <Button icon="pi pi-sign-out" severity="danger" text @click="handleLogout" v-tooltip.bottom="'Sair'" />
                    </div>
                </div>
            </template>

        </Menubar>
        <div class="flex-1 p-4">
            <Breadcrumb :home="home" :model="breadcrumbs" class="mb-4 bg-transparent border-none p-0"/>
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import CartComponent from '@/components/cart/index.vue';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const { totalItems } = storeToRefs(cartStore);

const items = ref([
    { label: 'Home', icon: 'pi pi-home', route: '/' },
    { label: 'Produtos', icon: 'pi pi-box', route: '/products' },
]);

const route = useRoute();
const home = ref({
  icon: 'pi pi-home',
  to: '/'
});

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};

const breadcrumbs = computed(() => {
  return route.matched
    .filter(path => path.name)
    .map(path => {
      return {
        label: String(path.name).charAt(0).toUpperCase() + String(path.name).slice(1),
        route: path.path
      }
    });
});
</script>


<style></style>